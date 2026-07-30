import { db } from './index';
import fs from 'fs';
import path from 'path';

export function applyMigrations() {
  // Create migrations table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id TEXT PRIMARY KEY,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const migrationsDir = path.join(process.cwd(), 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    return;
  }

  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const alreadyApplied = db.prepare('SELECT id FROM _migrations WHERE id = ?').get(file);

    if (!alreadyApplied) {
      console.log(`Applying migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

      const transaction = db.transaction((migrationSql: string) => {
        db.exec(migrationSql);
        db.prepare('INSERT INTO _migrations (id) VALUES (?)').run(file);
      });

      transaction(sql);
    }
  }
}
