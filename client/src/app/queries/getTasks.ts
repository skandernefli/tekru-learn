import { gql } from '@apollo/client';
const getTasks = gql`
query GetTasks {
    getTasks {
      id
      title
      description
      projectId
      employeeId
    }
  }
`;

export default getTasks;