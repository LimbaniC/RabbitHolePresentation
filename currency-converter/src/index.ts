import express from "express";
import router from "./routes.js";

const app = express(); 
app.use(express.json());
app.use("/currency-cache", router);    

const PORT = 3000; 

app.listen(PORT, () => { 
    console.log(`Welcome to Currency-Converter! DB is running on PORT:${PORT}`)
}); 


