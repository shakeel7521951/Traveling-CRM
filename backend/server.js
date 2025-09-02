import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import passengerRoutes from "./routes/passengerRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/Travelling_CRM')
.then(()=>console.log("Database is connected successfully"))
.catch((error)=>console.log("Error in connecting Database",error))

app.get("/", (req, res) => {
  return res.end("Backend is running...");
});

app.use(userRoutes)
app.use(passengerRoutes)

app.listen(PORT, () => console.log(`Backend is running on port ${PORT}`));
