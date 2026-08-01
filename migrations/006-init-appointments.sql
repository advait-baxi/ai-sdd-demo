CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id INTEGER NOT NULL,
  therapist_id INTEGER NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT NOT NULL,
  FOREIGN KEY (agent_id) REFERENCES agents(id),
  FOREIGN KEY (therapist_id) REFERENCES agents(id)
);
