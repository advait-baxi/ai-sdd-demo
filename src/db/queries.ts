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

export function createAppointment(agentId: string, therapyId: string, time: string) {
  const info = db.prepare(
    'INSERT INTO appointments (agent_id, therapy_id, appointment_time, status) VALUES (?, ?, ?, ?)'
  ).run(agentId, therapyId, time, 'Scheduled');
  return info.lastInsertRowid;
}

export function getAppointmentById(id: string) {
  return db.prepare('SELECT * FROM appointments WHERE id = ?').get(id) as any;
}

export function getAppointmentDetails(id: string) {
  return db.prepare(`
    SELECT
      a.*,
      ag.name as agent_name,
      t.name as therapy_name,
      t.category as therapy_category
    FROM appointments a
    JOIN agents ag ON a.agent_id = ag.id
    JOIN therapies t ON a.therapy_id = t.id
    WHERE a.id = ?
  `).get(id) as any;
}

export function getDashboardStats() {
  const agentsCount = db.prepare('SELECT COUNT(*) as count FROM agents').get() as any;
  const ailmentsCount = db.prepare('SELECT COUNT(*) as count FROM ailments').get() as any;
  const appointmentsCount = db.prepare('SELECT COUNT(*) as count FROM appointments').get() as any;

  return {
    agents: agentsCount?.count || 0,
    ailments: ailmentsCount?.count || 0,
    appointments: appointmentsCount?.count || 0,
  };
}

export function getAllAppointmentsDetails() {
  return db.prepare(`
    SELECT
      a.*,
      ag.name as agent_name,
      t.name as therapy_name,
      t.category as therapy_category
    FROM appointments a
    JOIN agents ag ON a.agent_id = ag.id
    JOIN therapies t ON a.therapy_id = t.id
    ORDER BY a.appointment_time DESC
  `).all() as any[];
}

export function updateAppointmentStatus(id: string, status: string) {
  return db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id);
}

