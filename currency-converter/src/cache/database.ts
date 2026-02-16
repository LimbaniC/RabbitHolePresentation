import sqlite3 from "sqlite3";

const dbName = "currency_cache.db";

export const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log(`Connected to SQLite database: ${dbName}`);
        db.run('CREATE TABLE IF NOT EXISTS currency_table (currency TEXT PRIMARY KEY, rate REAL, timestamp INTEGER)', (err) => {
            if (err) {
                console.error("Error creating table:", err.message);
            } else {
                console.log("Table created successfully or exists.");
            }
        });
    }
});

export default db;