import Database from 'better-sqlite3';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'clinic.db');
const db = new Database(DB_FILE);

export { db };
