import dotenv from "dotenv"; // pull env variables from .env file

import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
import express from "express";

import path from "path";
import http from "http";
import cors from "cors";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import chalk from "chalk";
import { importSchema } from "graphql-import";

import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import isAuth from "./middlewares/isAuth.js";
import database from "./db.js";

//start
dotenv.config();

const typeDefs = importSchema("./schema/schema.graphql");

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50000,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const resolvers = {
  Query,
  Mutation,
};

const PORT = process.env.PORT;

const app = express();

app.use(apiLimiter);
app.use(xss());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
app.use(mongoSanitize());
app.use(cors());
app.use(graphqlUploadExpress());

// app.use("/uploads", express.static(path.join(, "./uploads")));

app.get("/", (req, res) =>
  res.json({ "Contact Book version": "v1", status: "healthy" })
);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  uploads: false,
  resolvers: {
    ...resolvers,
    Upload: GraphQLUpload,
  },
  context: ({ req, res, connection }) => {
    if (connection) {
      return { ...connection, res, req };
    } else {
      return { ...isAuth(req), res, req };
    }
  },
});

server.applyMiddleware({ app });

database
  .connect()
  .then(() => {
    httpServer.listen(PORT || 4000, () => {
      console.log(
        chalk
          .hex("#fab95b")
          .bold(
            `🚀 Server ready at http://localhost:${process.env.PORT || 4000}${
              server.graphqlPath
            }`
          )
      );
    });
  })
  .catch((e) => console.log(chalk.red(e)));
