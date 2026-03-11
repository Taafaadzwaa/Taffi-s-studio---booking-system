const Database = require("better-sqlite3");

// This will create 'studio.db' if it doesn't exist
const db = new Database("studio.db");

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    time TEXT NOT NULL
  )
`).run();

module.exports = db;
