import { ApolloClient, InMemoryCache, gql,useQuery } from "@apollo/client";
/* import Employees from "./models/Employees"
 */const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

async function getEmployees(): Promise<Employees[]> {

    const result = await client.query({
      query: gql`
        query GetEmployees {
          getEmployees {
            email
            id
            name
            phoneNumber
            taskId
          }
        }
      `,
    });

    const data=result.data.getEmployees;
    return data;
 
};
const getProjects = async () => {
  try {
    const result = await client.query({
      query: gql`
        query GetProjects {
          getProjects {
            id
            title
            startDate
            endDate
            description
            taskId
          }
        }
      `,
    });

    console.log(result.data);
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
};
const getTasks = async () => {
  try {
    const result = await client.query({
      query: gql`
        query GetTasks {
          getTasks {
            id
            title
            description
            projectId
            employeeId
          }
        }
      `,
    });

    console.log(result.data);
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
};
const getEmployee = async (id) => {
  try {
    const result = await client.query({
      query: gql`
        query GetEmployee($id: ID!) {
          getEmployee(id: $id) {
            id
            name
            phoneNumber
            email
            taskId
          }
        }
      `,
      variables: {
        id: id,
      },
    });

    console.log("EmployeeId is ", result.data);
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
};
const getProject = async (id) => {
  try {
    const result = await client.query({
      query: gql`
        query GetProject($id: ID!) {
          getProject(id: $id) {
            id
            title
            startDate
            endDate
            description
            taskId
          }
        }
      `,
      variables: {
        id: id,
      },
    });

    console.log("EmployeeId is ", result.data);
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
};
const getTask = async (id) => {
  try {
    const result = await client.query({
      query: gql`
        query GetTask($id: ID!) {
          getTask(id: $id) {
            id
            title
            description
            projectId
            employeeId
          }
        }
      `,
      variables: {
        id: id,
      },
    });

    console.log("EmployeeId is ", result.data);
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
};
getEmployees()
console.log("this",getEmployees())
export default client;
export {
  getEmployees,
  getEmployee,
  getTask,
  getProjects,
  getProject,
  getTasks,
};
