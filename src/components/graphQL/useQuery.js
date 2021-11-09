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

const getUserDetails = gql`
  query findAccount($id: ID!) {
    account(id: $id) {
      _id
      email
      dociId
      createdAt
      updatedAt
      isEmailVerified
    }
  }
`;
export const UserProfile = (id) => {
  const { data, error, loading } = useQuery(getUserDetails, {
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
