import { gql } from '@apollo/client';

const createEmployee = gql`
mutation UpdateEmployee($updateEmployeeId: ID!) {
    updateEmployee(id: $updateEmployeeId) {
      name
      phoneNumber
      email
    }
  }
`;
export default createEmployee;