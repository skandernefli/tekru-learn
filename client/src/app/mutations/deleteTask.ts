import { gql } from '@apollo/client';

const deleteEmployee = gql`
mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId)
  }
`;
export default deleteEmployee;