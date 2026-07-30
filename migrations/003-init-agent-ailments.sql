CREATE TABLE agent_ailments (
  agent_id INTEGER NOT NULL,
  ailment_id INTEGER NOT NULL,
  PRIMARY KEY (agent_id, ailment_id),
  FOREIGN KEY (agent_id) REFERENCES agents (id) ON DELETE CASCADE,
  FOREIGN KEY (ailment_id) REFERENCES ailments (id) ON DELETE CASCADE
);
