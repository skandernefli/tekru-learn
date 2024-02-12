import { gql } from '@apollo/client';

const createEmployee = gql`
mutation Mutation($name: String!, $phoneNumber: String!, $email: String!) {
    createEmployee(name: $name, phoneNumber: $phoneNumber, email: $email) {
      email
      name
      phoneNumber
    }
  }
`;
export default createEmployee;