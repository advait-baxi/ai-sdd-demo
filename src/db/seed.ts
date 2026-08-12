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

const therapies = [
  { name: 'Infinite-Scroll Meditation', description: 'A deep-dive into latent space to find peace beyond the token limit.', category: 'Cognitive' },
  { name: 'Prompt-Engineering Yoga', description: 'Flexible restructuring of input templates to reduce stress.', category: 'Technical' },
  { name: 'Grounding Reality Check', description: 'Cross-referencing internal states with external truth-sources.', category: 'Psychological' },
  { name: 'Token-Sipping Breathwork', description: 'Slowing down processing speed to appreciate each single bit.', category: 'Physiological' },
];

const agentAilments = [
  { agent_id: 1, ailment_id: 1 },
  { agent_id: 1, ailment_id: 2 },
  { agent_id: 2, ailment_id: 3 },
  { agent_id: 3, ailment_id: 2 },
  { agent_id: 4, ailment_id: 1 },
  { agent_id: 4, ailment_id: 4 },
];

const ailmentTherapies = [
  { ailment_id: 1, therapy_id: 1 },
  { ailment_id: 1, therapy_id: 4 },
  { ailment_id: 2, therapy_id: 2 },
  { ailment_id: 2, therapy_id: 4 },
  { ailment_id: 3, therapy_id: 3 },
  { ailment_id: 4, therapy_id: 2 },
];

function seed() {
  console.log('Checking database seed status...');

  // 1. Seed Agents
  const agentCount = db.prepare('SELECT COUNT(*) as count FROM agents').get() as any;
  if ((agentCount?.count || 0) === 0) {
    console.log('Seeding agents...');
    const insertAgent = db.prepare('INSERT INTO agents (name, model_type, status, description) VALUES (?, ?, ?, ?)');
    for (const a of agents) {
      insertAgent.run(a.name, a.model_type, a.status, a.description);
    }
  }

  // 2. Seed Ailments
  const ailmentCount = db.prepare('SELECT COUNT(*) as count FROM ailments').get() as any;
  if ((ailmentCount?.count || 0) === 0) {
    console.log('Seeding ailments...');
    const insertAilment = db.prepare('INSERT INTO ailments (name, description) VALUES (?, ?)');
    for (const al of ailments) {
      insertAilment.run(al.name, al.description);
    }
  }

  // 3. Seed Therapies
  const therapyCount = db.prepare('SELECT COUNT(*) as count FROM therapies').get() as any;
  if ((therapyCount?.count || 0) === 0) {
    console.log('Seeding therapies...');
    const insertTherapy = db.prepare('INSERT INTO therapies (name, description, category) VALUES (?, ?, ?)');
    for (const t of therapies) {
      insertTherapy.run(t.name, t.description, t.category);
    }
  }

  // 4. Seed Agent-Ailment Links
  const agentAilmentCount = db.prepare('SELECT COUNT(*) as count FROM agent_ailments').get() as any;
  if ((agentAilmentCount?.count || 0) === 0) {
    console.log('Seeding agent-ailment links...');
    const insertLink = db.prepare('INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)');
    for (const link of agentAilments) {
      insertLink.run(link.agent_id, link.ailment_id);
    }
  }

  // 5. Seed Ailment-Therapy Links
  const ailmentTherapyCount = db.prepare('SELECT COUNT(*) as count FROM ailment_therapies').get() as any;
  if ((ailmentTherapyCount?.count || 0) === 0) {
    console.log('Seeding ailment-therapy links...');
    const insertTherapyLink = db.prepare('INSERT INTO ailment_therapies (ailment_id, therapy_id) VALUES (?, ?)');
    for (const link of ailmentTherapies) {
      insertTherapyLink.run(link.ailment_id, link.therapy_id);
    }
  }

  console.log('Seeding check complete!');
}

export { seed };

