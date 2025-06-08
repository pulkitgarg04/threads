import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

export async function initServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.get("/", (req, res) =>
        res.status(200).json({ message: "Everything is good" })
    );

    return app;
}