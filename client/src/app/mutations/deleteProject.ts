import { gql } from '@apollo/client';

const deleteProject = gql`
mutation DeleteProject($deleteProjectId: ID!) {
    deleteProject(id: $deleteProjectId)
  }
`;
export default deleteProject;