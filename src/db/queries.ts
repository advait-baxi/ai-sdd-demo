import { db } from './index';

export function getAllAgents() {
  return db.prepare('SELECT * FROM agents').all() as any[];
}

export function getAgentById(id: string) {
  return db.prepare('SELECT * FROM agents WHERE id = ?').get(id) as any;
}

export function getAllAilments() {
  return db.prepare('SELECT * FROM ailments').all() as any[];
}

export function getAilmentsForAgent(agentId: string) {
  return db.prepare(`
    SELECT ailments.* FROM ailments
    JOIN agent_ailments ON ailments.id = agent_ailments.ailment_id
    WHERE agent_ailments.agent_id = ?
  `).all(agentId) as any[];
}

export function getAllTherapies() {
  return db.prepare('SELECT * FROM therapies').all() as any[];
}

export function getTherapyById(id: string) {
  return db.prepare('SELECT * FROM therapies WHERE id = ?').get(id) as any;
}

export function getTherapiesForAilment(ailmentId: string) {
  return db.prepare(`
    SELECT therapies.* FROM therapies
    JOIN ailment_therapies ON therapies.id = ailment_therapies.therapy_id
    WHERE ailment_therapies.ailment_id = ?
  `).all(ailmentId) as any[];
}
