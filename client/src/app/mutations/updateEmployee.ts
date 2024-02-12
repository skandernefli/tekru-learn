import { gql } from '@apollo/client';

const createEmployee = gql`
mutation UpdateEmployee($name: String, $phoneNumber: String, $email: String, $updateEmployeeId: ID!) {
    updateEmployee(name: $name, phoneNumber: $phoneNumber, email: $email, id: $updateEmployeeId) {
      email
      name
      phoneNumber
      id
    }
  }
`;
export default createEmployee;