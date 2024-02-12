import { gql } from '@apollo/client';
const getEmployees = gql`
query GetEmployees {
    getEmployees {
      email
      id
      name
      phoneNumber
      taskId
    }
  } 
`;

export default getEmployees;