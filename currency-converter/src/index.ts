import express from "express";

const app = express(); 
const PORT = 3000; 

app.listen(PORT, () => { 
    console.log(`Welcome to Currency-Converter! Server is running on PORT:${PORT}`)
}); 


