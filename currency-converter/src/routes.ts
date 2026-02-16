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

router.post("/:currency/:rate", (req, res) => { 
    const { currency, rate } = req.params;

        createCurrency(currency, parseFloat(rate), (err: any, id: any) => {
            if (err) {
                console.error("Error creating cache item:", err);
                res.status(500).json({ error: "Failed to create cache item" });
            } else {
                res.json({ id });
            }});
})


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
            
    

    // try { 
    //     const response = await fetch(`http://localhost:4000/currencies/${to}`);
    //     const data = await response.json();
    //     const rate = data.rate;
    //     res.json({ rate });
    // }
    // catch (error) { 
    //     console.error("Error fetching exchange rate:", error);
    //     res.status(500).json({ error: "Failed to fetch exchange rate" });
    // }



export default router;