"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const schema = (0, graphql_1.buildSchema)(`
  type Query {
    hello: String
  }
`);
const root = {
    hello: () => {
        return "Hello world!";
    },
};
const app = (0, express_1.default)();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
