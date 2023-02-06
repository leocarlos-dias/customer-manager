import "express-async-errors";
import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors"
import { connectDatabase } from "./config/database";
import { routes } from "./routes/";

const app = express();

app.use(express.static("../../client"));

app.use(json());
app.use(cors());
app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: "Error",
        message: error.message,
    })
});

connectDatabase()
    .then(() => app.listen(3333, () => console.log("Server is running on port 3333")))
    .catch((error) => console.log(error));

