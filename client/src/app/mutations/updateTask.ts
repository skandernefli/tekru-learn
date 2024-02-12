import { gql } from '@apollo/client';

const updateTask = gql`
mutation Mutation($updateTaskId: ID!, $title: String, $description: String, $projectId: String, $employeeId: String) {
    updateTask(id: $updateTaskId, title: $title, description: $description, projectId: $projectId, employeeId: $employeeId) {
      id
      title
      description
      projectId
      employeeId
    }
  }
`;
export default updateTask;