import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose  from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// ----------------- middleware for parsing request body -----------------
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Making a MERN Stack!")
});

// ---------------- middleware for handling CORS policy

//this is the default setting and all are welcome
app.use(cors());

//below - we can set custom irigins 
// app.use(
//     cors({
//         origin: "http//localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.use("/books", bookRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to DB");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`); 
        });
    })
    .catch((error) => {
        console.log(error);
    });