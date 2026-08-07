-- Fix appointments table: replace therapist_id with therapy_id
-- Because SQLite's ALTER TABLE is limited, we recreate the table

PRAGMA foreign_keys=OFF;

CREATE TABLE appointments_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id INTEGER NOT NULL,
  therapy_id INTEGER NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT NOT NULL,
  FOREIGN KEY (agent_id) REFERENCES agents(id),
  FOREIGN KEY (therapy_id) REFERENCES therapies(id)
);

-- Migrate existing data if any (though unlikely at this stage)
INSERT INTO appointments_new (id, agent_id, therapy_id, appointment_time, status)
SELECT id, agent_id, therapist_id, appointment_time, status FROM appointments;

DROP TABLE appointments;
ALTER TABLE appointments_new RENAME TO appointments;

PRAGMA foreign_keys=ON;
