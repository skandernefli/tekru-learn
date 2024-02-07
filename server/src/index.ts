import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import bodyParser from 'body-parser';
import  { connection,sequelize } from './db/connection';
import typeDefs from './schema/api';
import cors from 'cors';
import TaskResolver from './resolvers/task';
import ProjectResolver from './resolvers/project';
import EmployeeResolver from './resolvers/employee';
import { makeExecutableSchema } from "@graphql-tools/schema";

const allowedOrigins=['*'];
const options: cors.CorsOptions={
origin:allowedOrigins,

}



const app = express();
const httpServer = http.createServer(app);
let schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
  ],
  resolvers: [
    TaskResolver,
    ProjectResolver,
    EmployeeResolver
  ],
});
const server = new ApolloServer({
  schema,
 plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
async function start(){
  await server.start();

}
connection().then(() => {
start().then(()=>{
  app.use(bodyParser.json()); 
  app.use(
  '/graphql', 
  cors(options),
  expressMiddleware(server),

);

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});})

});

process.on('SIGINT', async () => {
  console.log('\n🛑 Closing the database connection...');
  await sequelize.close();
  console.log('\n✅ Database connection closed. Exiting.');
  process.exit(0);
});