import { gql } from '@apollo/client';

const createProject = gql`
mutation CreateProject($title: String!, $startDate: String!, $endDate: String!, $description: String) {
    createProject(title: $title, startDate: $startDate, endDate: $endDate, description: $description) {
      description
      endDate
      startDate
      title
    }
  }
`;
export default createProject;