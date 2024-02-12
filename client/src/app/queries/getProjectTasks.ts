import { gql } from '@apollo/client';
const getProjectTasks = gql`
query GetProject($getProjectId: ID!) {
  getProject(id: $getProjectId) {
    description
    title
    startDate
    endDate
    tasks {
      employee {
        name
      }
      title
      description
      id
    }
  }
}
`;

export default getProjectTasks;