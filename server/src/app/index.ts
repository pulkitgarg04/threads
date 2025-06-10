import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { User } from "./user";
import { Thread } from "./thread";
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";

export async function initServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.get("/", (req, res) =>
        res.status(200).json({ message: "Everything is good" })
    );

    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs: `
       ${User.types}
       ${Thread.types}

        type Query {
            ${User.queries}
            ${Thread.queries}
        }

        type Mutation {
          ${Thread.mutations}
          ${User.mutations}
        }
    `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Thread.resolvers.queries,
            },
            Mutation: {
                ...Thread.resolvers.mutations,
                ...User.resolvers.mutations,
            },
            ...Thread.resolvers.extraResolvers,
            ...User.resolvers.extraResolvers,
        },
    });

    await graphqlServer.start();

    app.use(
        "/graphql",
        expressMiddleware(graphqlServer, {
            context: async ({ req, res }) => {
                return {
                    user: req.headers.authorization
                        ? JWTService.decodeToken(
                            req.headers.authorization.split("Bearer ")[1]
                        )
                        : undefined,
                };
            },
        })
    );

    return app;
}