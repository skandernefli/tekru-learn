import { gql } from '@apollo/client';

const createTask = gql`
mutation CreateTask($title: String!, $description: String!, $projectId: String!, $employeeId: String!) {
    createTask(title: $title, description: $description, projectId: $projectId, employeeId: $employeeId) {
      description
      employeeId
      projectId
      title
    }
  }
`;
export default createTask;