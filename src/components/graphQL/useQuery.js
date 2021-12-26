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

export const getPlans = gql`
  query getPlans {
    getPlans {
      plan {
        _id
        name
        amount
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export const getMessage = gql`
  query getMessages {
    getMessages {
      messages {
        _id
        recipient
        subject
        sender
        createdAt
        updatedAt
        body
      }
    }
  }
`;
export const getPermissions = gql`
  query getPermissions {
    getPermissions {
      permission {
        _id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const getSinglePermissions = gql`
  query getPermission($id: ID!) {
    getPermission(id: $id) {
      _id
      name
      description
    }
  }
`;

export const getRefferals = gql`
  query getReferrals {
    getReferrals {
      referral {
        _id
        doctor
        patient
        type
        reason
        note
        specialization
        testType
        createdAt
        updatedAt
      }
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

export const getUserDetails = gql`
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
