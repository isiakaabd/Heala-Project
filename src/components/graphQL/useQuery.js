import { gql, useQuery } from "@apollo/client";
import { PageInfo } from "./fragment";

export const doctor = gql`
  query doctorProfile($id: ID!) {
    doctorProfile(id: $id, orderBy:"-createdAt") {
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
  ${PageInfo}
  query getPlans($amount: Float, $page: Int) {
    getPlans(
      filterBy: { amount: $amount }
      page: $page
      orderBy: "-createdAt"
    ) {
      plan {
        _id
        name
        providerData
        amount
        description
        provider
        duration
        createdAt
        updatedAt
      }
      pageInfo {
        ...pageDetails
      }
    }
  }
`;
export const getSinglePlan = gql`
  query getPlan($id: ID!) {
    getPlan(id: $id,orderBy:"-createdAt") {
      name
      amount
      providerData
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
    getUserType(id: $id,orderBy:"-createdAt") {
      _id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const dashboard = gql`
  query getStats($providerId: String, $q: String) {
    getStats(filterBy: { providerId: $providerId }, q: $q) {
      patientStats
      doctorStats
      totalEarnings
      totalPayout
      appointmentStats
      subscribers
      availabilityCalendar {
        _id
        doctor
        doctorData
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
// ${PageInfo}
export const getEarningStats = gql`
  query getEarningStats($q: String, $page: Int, $providerId: String) {
    getEarningStats(filterBy: { providerId: $providerId }, q: $q, page: $page) {
      totalEarnings
      totalPayout
      earningData
      payoutData
    }
  }
`;
// pageInfo {
//   ...pageDetails
// }

export const getMessage = gql`
  ${PageInfo}
  query getMessages($recipient: String, $page: Int) {
    getMessages(
      filterBy: { recipient: $recipient }
      page: $page
      orderBy: "-createdAt"
    ) {
      messages {
        _id
        recipient
        subject
        sender
        createdAt
        updatedAt
        body
        recipientData
      }
      pageInfo {
        ...pageDetails
      }
    }
  }
`;
export const getPermissions = gql`
  ${PageInfo}
  query getPermissions($page: Int) {
    getPermissions(page: $page,orderBy:"-createdAt") {
      permission {
        _id
        name
        description
        createdAt
        updatedAt
      }
      pageInfo {
        ...pageDetails
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
  ${PageInfo}
  query getConsultations($id: ID!, $orderBy: String!, $page: Int) {
    getConsultations(
      filterBy: { patient: $id }
      orderBy: $orderBy
      page: $page
      
    ) {
      data {
        _id
        patient
        consultationOwner
        symptoms {
          name
        }
        description
        discomfortLevel
        firstNotice
        doctor
        type
        status
        contactMedium
        doctorData
        patientData
        diagnosis {
          ailment
          severity
        }
        doctorNote
        prescription {
          drugName
          dosageQuantity
          dosage
          dosageFrequency {
            day
            duration
          }
          mode
        }
        createdAt
        referralId
        updatedAt
      }
      pageInfo {
        ...pageDetails
      }
    }
  }
`;
export const getDocConsult = gql`
  ${PageInfo}
  query getConsultations($id: String!, $page: Int) {
    getConsultations(filterBy: { doctor: $id }, page: $page) {
      data {
        _id
        patient
        consultationOwner
        contactMedium
        symptoms {
          name
        }
        description
        discomfortLevel
        firstNotice
        doctor
        diagnosis {
          ailment
          severity
        }
        doctorNote
        prescription {
          drugName
          dosageQuantity
          dosage
          dosageFrequency {
            day
            duration
          }
          mode
        }
        createdAt
        patientData
        updatedAt
        referralId
        status
      }
      pageInfo {
        ...pageDetails
      }
    }
  }
`;
export const getConsult = gql`
  query getConsultation($id: ID!) {
    getConsultation(id: $id) {
      _id
      patient
      consultationOwner
      contactMedium
      status
      symptoms {
        name
      }
      description
      discomfortLevel
      firstNotice
      doctor
      diagnosis {
        ailment
        severity
      }
      doctorNote
      prescription {
        drugName
        dosageQuantity
        dosage
        dosageFrequency {
          day
          duration
        }
        mode
      }
      createdAt
      updatedAt
      type
      referralId
    }
  }
`;
export const getAppoint = gql`
  ${PageInfo}
  query getAppointments($id: ID!, $orderBy: String, $page: Int) {
    getAppointments(
      filterBy: { patient: $id }
      page: $page
      orderBy: $orderBy
    ) {
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
      pageInfo {
        ...pageDetails
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
      height
      weight
      bloodGroup
      genotype
      gender
      phoneNumber
      provider
      plan
      dociId
      status
      consultations
      createdAt
      image
    }
  }
`;
export const myMedic = gql`
  ${PageInfo}
  query getMyMedications($id: ID!, $orderBy: String!, $page: Int) {
    getMedications(filterBy: { patient: $id }, page: $page, orderBy: $orderBy) {
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
      pageInfo {
        ...pageDetails
      }
    }
  }
`;

export const getRefferals = gql`
  ${PageInfo}
  query getReferrals(
    $doctor: String
    $id: String
    $page: Int
    $specialization: String
    $patient: String
  ) {
    getReferrals(
      filterBy: {
        doctor: $doctor
        _id: $id
        specialization: $specialization
        patient: $patient
      }
      orderBy: "-createdAt"
      page: $page
    ) {
      referral {
        _id
        doctor
        patient
        type
        reason
        note
        specialization
        createdAt
        updatedAt
        doctorData
        patientData
      }
      pageInfo {
        ...pageDetails
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
      createdAt
      updatedAt
      doctorData
      patientData
    }
  }
`;
export const getRoles = gql`
  ${PageInfo}
  query getRoles($name: String, $page: Int) {
    getRoles(filterBy: { name: $name }, page: $page, orderBy: "-createdAt") {
      role {
        _id
        name
        permissions
        editable
        description
        createdAt
        updatedAt
      }
      pageInfo {
        ...pageDetails
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
      recipientData
      sender
      createdAt
      updatedAt
      body
    }
  }
`;
export const findAccounts = gql`
  ${PageInfo}
  query findAccounts($email: EmailAddress, $page: Int) {
    accounts(orderBy: "-createdAt", page: $page, filterBy: { email: $email }) {
      data {
        _id
        role
        email
        dociId
        createdAt
        updatedAt
        isEmailVerified
        providerId
        userTypeId
        isActive
        authType
      }
      pageInfo {
        ...pageDetails
      }
    }
  }
`;
export const verifiedEmail = gql`
  query findAccounts($dociId: String) {
    accounts(filterBy: { dociId: $dociId }) {
      data {
        isEmailVerified
      }
    }
  }
`;
export const findAdmin = gql`
  ${PageInfo}
  query findAccounts($role: String, $email: String, $page: Int) {
    accounts(
      filterBy: { role: $role, email: $email }
      page: $page
      orderBy: "-createdAt"
    ) {
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
      pageInfo {
        ...pageDetails
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
      status
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
export const getVerification = gql`
  ${PageInfo}
  query getVerifications($page: Int) {
    getVerifications(page: $page,orderBy:"-createdAt") {
      verification {
        _id
        qualification
        license
        yearbook
        alumni_association
        reference
        external_reference
        status
        createdAt
        doctorData
        updatedAt
        profileId
      }
      pageInfo {
        ...pageDetails
      }
    }
  }
`;
export const verification = gql`
  query getVerification($id: ID!) {
    getVerification(id: $id) {
      _id
      qualification
      license
      yearbook
      alumni_association
      reference
      external_reference
      status
      doctorData
      createdAt
      updatedAt
      profileId
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
  ${PageInfo}
  query findProfiles($gender: String, $page: Int, $dociId: String) {
    profiles(
      filterBy: { gender: $gender, dociId: $dociId }
      orderBy: "-createdAt"
      page: $page
    ) {
      data {
        _id
        firstName
        lastName
        height
        weight
        bloodGroup
        dociId
        genotype
        gender
        phoneNumber
        provider
        plan
        status
        consultations
        createdAt
        image
      }
      pageInfo {
        ...pageDetails
      }
    }
  }
`;

export const getDoctorsProfile = gql`
  ${PageInfo}
  query doctorProfiles($specialization: String, $page: Int) {
    doctorProfiles(filterBy: { specialization: $specialization }, page: $page) {
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
      pageInfo {
        ...pageDetails
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
      height
      weight
      bloodGroup
      genotype
      gender
      phoneNumber
      provider
      plan
      status
      dociId
      consultations
      createdAt
      image
    }
  }
`;
export const getMyEarningDoc = gql`
  query getMyEarnings($doc: String) {
    getMyEarnings(filterBy: { doctor: $doc }, page: 1) {
      data {
        _id
        doctor
        balance
        doctorData
        createdAt
        updatedAt
      }
      pageInfo {
        totalDocs
        limit
        offset
        hasPrevPage
        hasNextPage
        page
        totalPages
        pagingCounter
        prevPage
        nextPage
      }
      errors {
        field
        message
      }
    }
  }
`;
export const getProfileByDociId = gql`
  query findProfiles($dociId: String!) {
    profiles(filterBy: { dociId: $dociId }) {
      data {
        _id
        firstName
        lastName
      }
    }
  }
`;
export const getDoctorByDociId = gql`
  query doctorProfiles($dociId: String!) {
    doctorProfiles(filterBy: { dociId: $dociId }) {
      profile {
        firstName
        lastName
      }
    }
  }
`;
export const getMedication = gql`
  ${PageInfo}
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
  ${PageInfo}
  query getProviders($name: String, $userTypeId: String, $page: Int) {
    getProviders(
      filterBy: { name: $name, userTypeId: $userTypeId }
      page: $page
      orderBy: "-createdAt"
    ) {
      provider {
        _id
        name
        icon
        userTypeId
        createdAt
        updatedAt
      }
      pageInfo {
        ...pageDetails
      }
    }
  }
`;
export const getEmailList = gql`
  query getEmailList {
    getEmailList(orderBy: "-createdAt") {
      data {
        _id
        email
        createdAt
        updatedAt
        profileData
        role
        email
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
  ${PageInfo}
  query getDoctorPatients($id: String!, $page: Int) {
    getDoctorPatients(filterBy: { doctor: $id }, page: $page) {
      data {
        _id
        doctor
        patient
        createdAt
        updatedAt
      }
      pageInfo {
        ...pageDetails
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
export const getUsertypess = gql`
  query getUserTypeProviders($userTypeId: String) {
    getUserTypeProviders(filterBy: { userTypeId: $userTypeId }) {
      provider {
        _id
        name
        icon
        userTypeId
        createdAt
        updatedAt
        userTypeData {
          name
          icon
          createdAt
          updatedAt
        }
      }
      pageInfo {
        totalDocs
        limit
        offset
        hasPrevPage
        hasNextPage
        page
        totalPages
        pagingCounter
        prevPage
        nextPage
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
