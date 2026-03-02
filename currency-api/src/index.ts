import express from "express"; 
import router from "./routes.js";

const PORT = 4000; 
const app = express();

app.use(express.json());
app.use("/", router);


app.listen(PORT, () => {
    console.log(`Welcome to Currency-API! Server is running on PORT:${PORT}`)
}) 

