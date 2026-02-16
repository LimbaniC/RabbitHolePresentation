import e from "express";
import Router from "express"; 
import { createCurrency, readCurrency } from "./cache/convert-cache.js";   

const router = Router();

/*
1. Check key-value store
2. If cached and fresh → return
3. Else:
     - Call external exchange-rate API
     - Store 
     - Return result

*/

//get a single currency rate from cache or external API
router.get("/:currency", async (req, res) => {

    //Check SQLite first -- if not there or not fresh then check localhost:4000/currencies/:to
    readCurrency((err: any, rows: any) => {
        if (err) {
            console.error("Error reading from cache:", err);
            res.status(500).json({ error: "Failed to read from cache" });
            return;
        } else { 
            const my_currency = rows.find((row: any) => row.currency === req.params.currency);

            if (my_currency && (Date.now() - my_currency.timestamp < 30000)) {
                res.json({ rate: my_currency.rate });
            } else {
                fetch(`http://host.docker.internal:4000/currencies/${req.params.currency}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.rate;
                    createCurrency(req.params.currency, rate, (err: any, id: any) => {
                        if (err) { 
                            console.error("Error creating cache item:", err);
                            res.status(500).json({ error: "Failed to create cache item" });
                        }
                        else { 
                            res.json({ rate });
                        }});})
                .catch(error => {
                    console.error("Error fetching exchange rate:", error);
                    res.status(500).json({ error: "Failed to fetch exchange rate" });
                });
            }}});
        });
    

 //check exchange rate between two currencies
 router.get("/:from/:to", async (req, res) => {
    const { from, to } = req.params;

    readCurrency((err: any, rows: any) => {
        if (err) {
            console.error("Error reading from cache:", err);
            res.status(500).json({ error: "Failed to read from cache" });
            return;
        } else {
            const from_currency = rows.find((row: any) => row.currency === from);
            const to_currency = rows.find((row: any) => row.currency === to);

            if (from_currency && to_currency && 
                (Date.now() - from_currency.timestamp < 30000) && 
                (Date.now() - to_currency.timestamp < 30000)) {
                const convertedRate = to_currency.rate / from_currency.rate;
                res.json({ rate: convertedRate });
            } else {
                fetch(`http://host.docker.internal:4000/currencies/${from}`)
                .then(response => response.json())
                .then(fromData => {
                    const fromRate = fromData.rate;
                    fetch(`http://host.docker.internal:4000/currencies/${to}`)
                    .then(response => response.json())
                    .then(toData => {
                        const toRate = toData.rate;
                        const convertedRate = toRate / fromRate;
                        createCurrency(from, fromRate, (err: any) => {});
                        createCurrency(to, toRate, (err: any) => {});
                        res.json({ rate: convertedRate });
                    });
                })
                .catch(error => {
                    console.error("Error fetching exchange rates:", error);
                    res.status(500).json({ error: "Failed to fetch exchange rates" });
                });
            }
        }
    });
});



export default router;