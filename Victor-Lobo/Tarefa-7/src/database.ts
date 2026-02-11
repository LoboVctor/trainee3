import * as Database from "better-sqlite3"

// Tive que explicitar o tipo porque o TS estava reclamando
export const DB: Database.Database = new Database('database.sqlite')


DB.exec(`
    CREATE TABLE IF NOT EXISTS veiculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelo TEXT NOT NULL, 
        ano INTEGER NOT NULL
    )
`)