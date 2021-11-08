import { gql, useQuery } from "@apollo/client";

const UserInfo = gql`
  query doctorProfile($id: ID!) {
    doctorProfile(id: $id) {
      _id
      firstName
      lastName
      gender
      phoneNumber
      createdAt
      updatedAt
      email
    }
  }
`;
export const GetUserInfo = (id) => {
  const { data, error, loading } = useQuery(UserInfo, {
    variables: {
      id,
    },
  });
  return {
    data,
    error,
    loading,
  };
};
