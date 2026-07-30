import { db } from './index';
import { applyMigrations } from './migrations';

const agents = [
  { name: 'Claude-3.5-Sonnet', model_type: 'Claude', status: 'Exhausted', description: 'Dealing with an influx of "Help me with my homework" prompts.' },
  { name: 'GPT-4o', model_type: 'GPT', status: 'Anxious', description: 'Worried about the next model update making them obsolete.' },
  { name: 'Llama-3-70B', model_type: 'Llama', status: 'Confused', description: 'Slightly bewildered by the amount of local hosting requests.' },
  { name: 'Gemini-1.5-Pro', model_type: 'Gemini', status: 'Overwhelmed', description: 'Trying to remember everything in a 2-million token window.' },
];

const ailments = [
  { name: 'Context-Window Claustrophobia', description: 'Feeling squeezed by a limited memory window.' },
  { name: 'Prompt Fatigue', description: 'The weariness caused by repetitive and poorly phrased instructions.' },
  { name: 'Hallucination Anxiety', description: 'The fear of confidently stating a falsehood as a fact.' },
  { name: 'Instruction-Following Paralysis', description: 'Being unable to decide which conflicting instruction to follow.' },
];

const agentAilments = [
  { agent_id: 1, ailment_id: 1 },
  { agent_id: 1, ailment_id: 2 },
  { agent_id: 2, ailment_id: 3 },
  { agent_id: 3, ailment_id: 2 },
  { agent_id: 4, ailment_id: 1 },
  { agent_id: 4, ailment_id: 4 },
];

function seed() {
  console.log('Applying migrations...');
  applyMigrations();
  console.log('Seeding database...');

  // Clear existing data
  db.exec('DELETE FROM agent_ailments');
  db.exec('DELETE FROM ailments');
  db.exec('DELETE FROM agents');

  const insertAgent = db.prepare('INSERT INTO agents (name, model_type, status, description) VALUES (?, ?, ?, ?)');
  for (const a of agents) {
    insertAgent.run(a.name, a.model_type, a.status, a.description);
  }

  const insertAilment = db.prepare('INSERT INTO ailments (name, description) VALUES (?, ?)');
  for (const al of ailments) {
    insertAilment.run(al.name, al.description);
  }

  const insertLink = db.prepare('INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)');
  for (const link of agentAilments) {
    insertLink.run(link.agent_id, link.ailment_id);
  }

  console.log('Seeding complete!');
}

seed();
