import { gql, useQuery } from "@apollo/client";

export const doctor = gql`
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
      hospital
      specialization
      dob
      cadre
      picture
      provider
      consultations
      status
      dociId
    }
  }
`;

export const getPlans = gql`
  query getPlans {
    getPlans(orderBy: "-createdAt") {
      plan {
        _id
        name
        amount
        description
        provider
        duration
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
      provider
      duration
    }
  }
`;
export const DoctorCount = gql`
  query DoctorCount {
    DoctorCount
  }
`;
export const getUserType = gql`
  query getUserType($id: ID!) {
    getUserType(id: $id) {
      _id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const dashboard = gql`
  query getStats {
    getStats {
      patientStats
      doctorStats
      totalEarnings
      totalPayout
      appointmentStats
      subscribers
      availabilityCalendar {
        _id
        doctor
        dates {
          day
          available
          times {
            start
            stop
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const getMessage = gql`
  query getMessages {
    getMessages(orderBy: "-createdAt") {
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
  query getConsultations($id: ID!, $orderBy: String!) {
    getConsultations(filterBy: { patient: $id }, orderBy: $orderBy) {
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
export const getDocConsult = gql`
  query getConsultations($id: ID!) {
    getConsultations(filterBy: { doctor: $id }) {
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
export const getConsult = gql`
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
export const getAppoint = gql`
  query getAppointments($id: ID!, $orderBy: String!) {
    getAppointments(filterBy: { patient: $id }, orderBy: $orderBy) {
      data {
        _id
        doctor
        patient
        date
        time
        createdAt
        updatedAt
        patientData
        doctorData
      }
    }
  }
`;
export const getDOCAppoint = gql`
  query getAppointments($id: ID!, $orderBy: String!) {
    getAppointments(filterBy: { doctor: $id }, orderBy: $orderBy) {
      data {
        _id
        doctor
        patient
        date
        time
        createdAt
        updatedAt
        patientData
        doctorData
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
      dociId
      height
      weight
      bloodGroup
      genotype
      gender
      phoneNumber
      provider
      plan
      status
      consultations
      createdAt
    }
  }
`;
export const myMedic = gql`
  query getMyMedications($id: ID!, $orderBy: String!) {
    getMedications(filterBy: { patient: $id }, orderBy: $orderBy) {
      medication {
        _id
        name
        interval
        createdAt

        updatedAt
        doctor
        dosage
        patient
      }
    }
  }
`;

export const getRefferals = gql`
  query getReferrals {
    getReferrals(orderBy: "-createdAt") {
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
export const getRefferal = gql`
  query getReferral($id: ID!) {
    getReferral(id: $id) {
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
`;
export const getRoles = gql`
  query getRoles {
    getRoles(orderBy: "-createdAt") {
      role {
        _id
        name
        permissions
        editable
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const getRole = gql`
  query getRole($id: ID!) {
    getRole(id: $id) {
      _id
      name
      permissions
      editable
      description
      createdAt
      updatedAt
    }
  }
`;
export const getAMessage = gql`
  query getMessage($id: ID!) {
    getMessage(id: $id) {
      _id
      recipient
      subject
      sender
      createdAt
      updatedAt
      body
    }
  }
`;
export const findAccounts = gql`
  query findAccounts {
    accounts {
      data {
        _id
        email
        dociId
        createdAt
        updatedAt
        isEmailVerified
        role
      }
    }
  }
`;
export const findAdmin = gql`
  query findAccounts {
    accounts(orderBy: "-createdAt", filterBy: { role: "admin" }) {
      data {
        _id
        role
        email
        dociId
        createdAt
        updatedAt
        role
        isActive
      }
    }
  }
`;
export const findAllergies = gql`
  query findAllergies($id: String!) {
    findAllergies(filterBy: { profile: $id }) {
      allergies {
        _id
        medication
        severity
        food
      }
    }
  }
`;
export const getLabResult = gql`
  query getLabResults($id: ID!) {
    getLabResults(filterBy: { patient: $id }) {
      lab {
        _id
        url
        partner
        doctor
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
        provider
        height
        weight
        bloodGroup
        dociId
        genotype
        gender
        phoneNumber
        plan
        status
        consultations
        createdAt
      }
    }
  }
`;
export const getDoctorsProfile = gql`
  query doctorProfiles {
    doctorProfiles {
      profile {
        _id
        firstName
        lastName
        gender
        phoneNumber
        createdAt
        updatedAt
        email
        hospital
        specialization
        dob
        cadre
        picture
        provider
        consultations
        status
        dociId
      }
    }
  }
`;

export const getProfile = gql`
  query findProfile($profileId: ID!) {
    profile(id: $profileId) {
      _id
      firstName
      lastName
      dociId
      height
      weight
      bloodGroup
      genotype
      gender
      phoneNumber
      provider
      plan
      status
      consultations
      createdAt
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
export const getAvailability = gql`
  query getAvailabilities($id: String!) {
    getAvailabilities(filterBy: { doctor: $id }) {
      availability {
        _id
        createdAt
        updatedAt
        dates {
          day
          available
          times {
            start
            stop
          }
        }
      }
      errors {
        field
        message
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
export const getProviders = gql`
  query getProviders {
    getProviders {
      provider {
        _id
        name
        icon
        userTypeId
        createdAt
        updatedAt
      }
    }
  }
`;
export const getPartners = gql`
  query getPartners {
    getPartners {
      data {
        _id
        name
        email
        category
        logoImageUrl
      }
    }
  }
`;
export const getAllergies = gql`
  query findAllergies {
    findAllergies {
      allergies {
        _id
        food
        medication
        profile
        createdAt
        updatedAt
        severity
      }
    }
  }
`;
export const getReminder = gql`
  query getReminder($id: ID!) {
    getReminder(id: $id) {
      reminder {
        _id
        date
        description
        type
        createdAt
        updatedAt
        patient
        interval
      }
    }
  }
`;
export const getDoctorPatients = gql`
  query getDoctorPatients($id: String!) {
    getDoctorPatients(filterBy: { doctor: $id }) {
      data {
        _id
        doctor
        patient

        createdAt
        updatedAt
      }
    }
  }
`;
export const getSingleProvider = gql`
  query getPartnerCategories {
    getPartnerCategories {
      data
    }
  }
`;

export const getCategory = gql`
  query getProvider($id: ID!) {
    getProvider(id: $id) {
      _id
      name
      icon
      userTypeId
      createdAt
      updatedAt
    }
  }
`;
export const getUserTypes = gql`
  query getUserTypes {
    getUserTypes {
      userType {
        _id
        name
        icon
        createdAt
        updatedAt
      }
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
