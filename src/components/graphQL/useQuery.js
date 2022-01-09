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
export const getSinglePlan = gql`
  query getPlan($id: ID!) {
    getPlan(id: $id) {
      name
      amount
      description
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
export const getConsultations = gql`
  query getConsultations {
    getConsultations {
      data {
        _id
        doctor
        patient
        ailment
        severity
        description
        treatment
        createdAt
        updatedAt
      }
    }
  }
`;
export const findProfile = gql`
  query findProfile($id: ID!) {
    profile(id: $id) {
      _id
      firstName
      lastName
      height
      weight
      bloodGroup
      genotype
      gender
      phoneNumber
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
export const getConsultation = gql`
  query getConsultation($id: ID!) {
    getConsultation(id: $id) {
      _id
      doctor
      patient
      ailment
      severity
      description
      treatment
      createdAt
      updatedAt
    }
  }
`;
export const getMyEarnings = gql`
  query getMyEarnings {
    getMyEarnings {
      data {
        _id
        doctor
        balance
        createdAt
        updatedAt
      }
    }
  }
`;
export const getPatients = gql`
  query findProfiles {
    profiles {
      data {
        _id
        firstName
        lastName
        height
        weight
        bloodGroup
        genotype
        gender
        phoneNumber
      }
    }
  }
`;
export const getDoctorsProfile = gql`
  query doctorProfiles {
    doctorProfiles {
      data {
        _id
        firstName
        lastName
        gender
        phoneNumber
        createdAt
        updatedAt
        email
        dociId
      }
    }
  }
`;

export const getProfile = gql`
  query findProfile($id: ID!) {
    profile(id: $id) {
      _id
      firstName
      lastName
      height
      weight
      bloodGroup
      genotype
      gender
      phoneNumber
    }
  }
`;
export const getMedication = gql`
  query getMedication($id: ID!) {
    getMedication(id: $id) {
      medication {
        _id
        name
        interval
        doctor
        createdAt
        updatedAt
        dosage
      }
    }
  }
`;
export const getAppointment = gql`
  query getAppointment($id: ID!) {
    getAppointment(id: $id) {
      _id
      doctor
      patient
      date
      time
      createdAt
      updatedAt
    }
  }
`;
export const getAllAppointment = gql`
  query getAppointments {
    getAppointments {
      data {
        _id
        doctor
        patient
        date
        time
        createdAt
        updatedAt
      }
    }
  }
`;
export const getMedications = gql`
  query getMedications {
    getMedications {
      medication {
        _id
        name
        interval
        doctor
        createdAt
        updatedAt
        dosage
        patient
      }
    }
  }
`;

export const getMyConsultation = gql`
  query getMyConsultations {
    getMyConsultations {
      data {
        _id
        doctor
        patient
        ailment
        severity
        description
        treatment
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
