import { gql } from '@apollo/client';

const deleteEmployee = gql`
mutation DeleteEmployee($deleteEmployeeId: ID!) {
    deleteEmployee(id: $deleteEmployeeId)
  }
`;
export default deleteEmployee;