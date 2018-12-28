--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE account (
  id INTEGER PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL
);

INSERT INTO account (firstName, lastName, email) VALUES ('Test', 'Name', 'email@email.com');
INSERT INTO account (firstName, lastName, email) VALUES ('Test', 'Name', 'email@email.com');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE account;