import { gql } from "@apollo/client";

export const Login_USER = gql`
  mutation login($email: EmailAddress!, $password: String!, $authType: String!) {
    login(data: { email: $email, password: $password, authType: $authType }) {
      account {
        access_token
        dociId
        _id
        refresh_token
      }
      errors {
        field
        message
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`;
