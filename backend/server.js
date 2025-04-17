import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";




// app config
const app = express();
const port = 4000;

// middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api routes
app.get("/", (req, res) => {
     res.send("API working")
});

app.listen(port, () => {
     console.log(`Server Started on http://localhost:${port}`)
});

// mongodb+srv://cranberrysauce:Lbn02082001@cluster0.w5yrgev.mongodb.net/?