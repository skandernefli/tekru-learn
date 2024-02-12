import { gql } from '@apollo/client';
const getProjects = gql`
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
`;

export default getProjects;