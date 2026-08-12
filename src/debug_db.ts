import { db } from './db/index';
import { seed } from './db/seed';

const therapiesCount = db.prepare('SELECT COUNT(*) as count FROM therapies').get() as any;
console.log(`Therapies count: ${therapiesCount?.count || 0}`);

const ailmentsCount = db.prepare('SELECT COUNT(*) as count FROM ailments').get() as any;
console.log(`Ailments count: ${ailmentsCount?.count || 0}`);

if ((therapiesCount?.count || 0) === 0 || (ailmentsCount?.count || 0) === 0) {
  console.log('Missing data. Forcing seed...');
  // We can't use the seed() function directly if it has the agentCount check.
  // Let's just manually run the inserts for therapies and ailments if they are missing.
  // Or better, just let's modify seed.ts to be less restrictive.
}
