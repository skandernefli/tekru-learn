import { gql } from '@apollo/client';

const updateProject = gql`
mutation UpdateProject($updateProjectId: ID!, $title: String, $startDate: String, $endDate: String, $description: String) {
  updateProject(id: $updateProjectId, title: $title, startDate: $startDate, endDate: $endDate, description: $description) {
    description
    endDate
    startDate
    title
    id
  }
}
`;
export default updateProject;