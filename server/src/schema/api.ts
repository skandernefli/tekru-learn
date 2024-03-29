import { gql } from "apollo-server-express";

const typeDefs = gql`

  type employee {
    id: ID!
    name: String!
    phoneNumber: String!
    email: String
    taskId: Int
  }
  type project {
    id: ID!
    title: String!
    startDate: String!
    endDate: String!
    description: String
    taskId: Int
    tasks: [task]  
  }
  type task {
    id: ID!
    title: String!
    description: String!
    projectId: String!
    employeeId: String!
    employee:employee
    project:project
  }
  type Query {
    getEmployee(id: ID!): employee
    getEmployees: [employee]
    getProject(id: ID!): project
    getProjects: [project]
    getTask(id: ID!): task
    getTasks: [task]
  }
  type Mutation {
    createEmployee(
      id: ID
      name: String!
      phoneNumber: String!
      email: String!
      taskId: Int
    ): employee

    updateEmployee(
      id: ID!
      name: String
      phoneNumber: String
      email: String
      taskId: Int
    ): employee

    deleteEmployee(id: ID!): Boolean

    createTask(
      id: ID
      title: String!
      description: String!
      projectId: String!
      employeeId: String!
    ): task

    updateTask(
      id: ID!
      title: String
      description: String
      projectId: String
      employeeId: String
    ): task

    deleteTask(id: ID!): Boolean

    createProject(
      id: ID
      title: String!
      startDate: String!
      endDate: String!
      description: String
      taskId: Int
    ): project

    updateProject(
      id: ID!
      title: String
      startDate: String
      endDate: String
      description: String
      taskId: Int
    ): project

    deleteProject(id: ID!): Boolean
  }
`;
export default typeDefs;
