CREATE TABLE ailment_therapies (
  ailment_id INTEGER NOT NULL,
  therapy_id INTEGER NOT NULL,
  PRIMARY KEY (ailment_id, therapy_id),
  FOREIGN KEY (ailment_id) REFERENCES ailments(id),
  FOREIGN KEY (therapy_id) REFERENCES therapies(id)
);
