import db from "./database.js";

/*
1. Check key-value store (in SQLite) for both currencies X and Y (convert from X to Y)
2. If both are cached and fresh (less than 30 seconds old ) → return
3. Else:
     - Call external exchange-rate API
     - Store in SQLite cache 
     - Return result
*/

export const createCurrency = (currency: string, rate:number,  callback: any) => {
    const sql = `INSERT INTO currency_table (currency, rate) VALUES (?, ?)`;
    db.run(sql, [currency, rate], function(err) {
            callback(err, this.lastID);
    });
}

// export const createItem = (fromCurrency: string, toCurrency : string, rate: number, callback: any ) => { 
//      const sql = `INSERT INTO exchange_rates (from_currency, to_currency, currency_pair, rate, timestamp) VALUES (?, ?, ?, ?, ?)`;
//      db.run(sql, [fromCurrency, toCurrency, `${fromCurrency}-${toCurrency}`, rate, Date.now()], function(err) {
//         callback(err, this.lastID);
//         });
// }

export const readCurrency = (callback: any) => { 
     const sql = `SELECT * FROM currency_table`;
     db.all(sql, [], (err, rows) => {
        callback(err, rows);
     });
}

