import { gql } from "@apollo/client";
import { PageInfo } from "./fragment";

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
  ${PageInfo}
  query getPlans($amount: Float, $page: Int, $first: Int, $provider: String) {
    getPlans(
      filterBy: { amount: $amount, provider: $provider }
      page: $page
      orderBy: "-createdAt"
      first: $first
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
    getPlan(id: $id) {
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
    getUserType(id: $id, orderBy: "-createdAt") {
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
    getStats(filterBy: { providerId: "61db6f8968b248001aec4fcb" }) {
      patientStats {
        totalActive
        totalInactive
        activeChartData
        inactiveChartData
      }
      doctorStats {
        totalActive
        totalInactive
        activeChartData
        inactiveChartData
      }
      partnerStats {
        total
        chartData
        hospitalChartData
        diagnosticsChartData
        pharmacyChartData
        totalHospitals
        totalPharmacies
        totalDiagnostics
      }
      subscriptionStats {
        totalActive
        totalInactive
        chartData
        activeChartData
        inactiveChartData
      }
      earningStats {
        total
        chartData
      }
      payoutStats {
        total
        chartData
      }
      consultationStats {
        totalOngoing
        totalAccepted
        totalCompleted
        totalDeclined
        totalCancelled
        ongoingChartData
        acceptedChartData
        completedChartData
        declinedChartData
        cancelledChartData
      }
      availabilityCalender {
        today
        availableDoctors {
          dociId
          firstName
          lastName
          providerId
          availability {
            times {
              start
              stop
              available
            }
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;
//   totalActiveSubscribers
// totalInactiveSubscribers
// ${PageInfo}
export const getEarningStats = gql`
  query getEarningStats($q: String, $page: Int, $providerId: String, $status: String) {
    getEarningStats(filterBy: { status: $status, providerId: $providerId }, q: $q, page: $page) {
      totalEarnings
      totalPayout
      earningData
      payoutData
    }
  }
`;

export const getFinanceStats = gql`
  query getEarningStats($q: String, $page: Int) {
    getEarningStats(q: $q, page: $page) {
      subscriptionIncome
      totalPayout
    }
  }
`;
// pageInfo {
//   ...pageDetails
// }

export const getEarningData = gql`
  query getEarningStats($first: Int, $page: Int) {
    getEarningStats(q: "365", page: $page, first: $first, orderBy: "-createdAt") {
      earningData
    }
  }
`;

export const getSubscriptionsIncome = gql`
  query getEarningStats($first: Int, $page: Int) {
    getEarningStats(q: "365", page: $page, first: $first, orderBy: "-createdAt") {
      subscriptionIncomeData
    }
  }
`;

export const getPayoutData = gql`
  query getEarningStats($first: Int, $page: Int, $status: String) {
    getEarningStats(
      filterBy: { status: $status }
      q: "365"
      page: $page
      first: $first
      orderBy: "-createdAt"
    ) {
      payoutData
    }
  }
`;

export const getMessage = gql`
  ${PageInfo}
  query getMessages($recipient: String, $page: Int, $first: Int) {
    getMessages(
      filterBy: { recipient: $recipient }
      page: $page
      orderBy: "-createdAt"
      first: $first
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
  query getPermissions($page: Int, $first: Int) {
    getPermissions(page: $page, orderBy: "-createdAt", first: $first) {
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
  query getConsultations($id: ID!, $orderBy: String!, $page: Int, $first: Int) {
    getConsultations(filterBy: { patient: $id }, orderBy: $orderBy, page: $page, first: $first) {
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
  query getConsultations($id: String!, $page: Int, $first: Int) {
    getConsultations(filterBy: { doctor: $id }, page: $page, first: $first) {
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
      patientData
      doctorData
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
  query getAppointments($id: ID!, $orderBy: String, $page: Int, $first: Int) {
    getAppointments(filterBy: { patient: $id }, page: $page, orderBy: $orderBy, first: $first) {
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
  query getMyMedications($id: ID!, $orderBy: String!, $page: Int, $first: Int) {
    getMedications(filterBy: { patient: $id }, page: $page, orderBy: $orderBy, first: $first) {
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
    $type: String
    $first: Int
  ) {
    getReferrals(
      filterBy: {
        doctor: $doctor
        _id: $id
        specialization: $specialization
        patient: $patient
        type: $type
      }
      orderBy: "-createdAt"
      page: $page
      first: $first
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
      doctorData
      patientData
      type
      reason
      note
      specialization
      totalMarkUp
      trackingId
      tests {
        name
        price
        tat
      }
      consultationId
      createdAt
      updatedAt
    }
  }
`;
export const getRoles = gql`
  ${PageInfo}
  query getRoles($name: String, $page: Int, $first: Int) {
    getRoles(filterBy: { name: $name }, page: $page, orderBy: "-createdAt", first: $first) {
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
  query findAccounts($email: String, $page: Int, $first: Int) {
    accounts(
      filterBy: { role: "admin", email: $email }
      page: $page
      orderBy: "-createdAt"
      first: $first
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
  query getVerifications($page: Int, $first: Int, $status: Boolean) {
    getVerifications(
      page: $page
      orderBy: "-createdAt"
      first: $first
      filterBy: { status: $status }
    ) {
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
  ${PageInfo}
  query getMyEarnings($id: ID!, $page: Int, $first: Int) {
    getMyEarnings(filterBy: { doctor: $id }, first: $first, page: $page, orderBy: "-createdAt") {
      data {
        _id
        doctor
        balance
        doctorData
        createdAt
        updatedAt
      }
      totalEarnings
      pageInfo {
        ...pageDetails
      }
      errors {
        field
        message
      }
    }
  }
`;

export const getPatients = gql`
  ${PageInfo}
  query findProfiles(
    $gender: String
    $page: Int
    $first: Int
    $firstName: String
    $lastName: String
    $id: String
    $provider: String
  ) {
    profiles(
      filterBy: {
        gender: $gender
        dociId: $id
        firstName: $firstName
        lastName: $lastName
        providerId: $provider
      }
      orderBy: "-createdAt"
      page: $page
      first: $first
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

export const getPatientsByStatus = gql`
  ${PageInfo}
  query findProfiles($status: Boolean, $first: Int) {
    profilesByStatus(filterBy: { isActive: $status }, orderBy: "-createdAt", first: $first) {
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

export const getPatientsByPlan = gql`
  ${PageInfo}
  query findProfiles($planId: String, $first: Int) {
    profilesByPlan(filterBy: { planId: $planId }, orderBy: "-createdAt", first: $first) {
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
  query doctorProfiles(
    $id: String
    $firstName: String
    $lastName: String
    $gender: String
    $cadre: String
    $providerId: String
    $specialization: String
    $page: Int
    $first: Int
  ) {
    doctorProfiles(
      filterBy: {
        dociId: $id
        firstName: $firstName
        lastName: $lastName
        gender: $gender
        cadre: $cadre
        providerId: $providerId
        specialization: $specialization
      }
      first: $first
      page: $page
    ) {
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

export const getDoctorsProfileByStatus = gql`
  ${PageInfo}
  query doctorProfiles($status: Boolean, $first: Int, $page: Int) {
    doctorProfilesByStatus(
      filterBy: { isActive: $status, role: "doctor" }
      first: $first
      page: $page
    ) {
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
        day
        available
        times {
          start
          stop
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
  query getProviders($name: String, $userTypeId: String, $page: Int, $first: Int) {
    getProviders(
      filterBy: { name: $name, userTypeId: $userTypeId }
      page: $page
      orderBy: "-createdAt"
      first: $first
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
  query getEmailList($role: String) {
    getEmailList(filterBy: { role: $role }, orderBy: "-createdAt") {
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
  query getPartners($page: Int, $first: Int, $category: String) {
    getPartners(
      filterBy: { category: $category }
      orderBy: "-createdAt"
      page: $page
      first: $first
    ) {
      data {
        _id
        name
        email
        category
        logoImageUrl
        profileUrl
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
  query getDoctorPatients($id: String!, $page: Int, $first: Int) {
    getDoctorPatients(filterBy: { doctor: $id }, page: $page, first: $first) {
      data {
        _id
        doctor
        patient
        patientData
        createdAt
        updatedAt
      }
      pageInfo {
        ...pageDetails
      }
    }
  }
`;
export const findMultipleProfiles = gql`
  query findMultipleProfiles($ids: String) {
    findMultipleProfiles(ids: $ids) {
      profiles {
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
        consultations
        createdAt
        image
        rating
      }
    }
  }
`;
//
export const getNotifications = gql`
  query getNotifications($user: String) {
    getNotifications(user: $user) {
      data {
        user
        content
        itemId
        ticker
        title
        seen
        tag
        useSound
        role
        saveNotification
        previewImageUri
        previewImageUriThumbnail
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
  query getUserTypes($first: Int) {
    getUserTypes(first: $first) {
      userType {
        _id
        name
        icon
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

export const getListOfLabTests = gql`
  query getDiagnosticLabTests {
    getDiagnosticLabTests {
      data {
        _id
        partner
        name
        price
        tat
      }
    }
  }
`;

export const DELETE_TEST = gql`
  query deleteDiagnosticLabTest($id: ID!) {
    deleteDiagnosticLabTest(id: $id) {
      _id
      partner
      name
      price
      tat
    }
  }
`;

export const DELETE_PARTNER = gql`
  query deletePartner($id: ID!) {
    deletePartner(id: $id) {
      _id
      name
      email
      category
      logoImageUrl
      accountId
      dociId
    }
  }
`;

// export const UserProfile = (id) => {
//   const { data, error, loading } = useQuery(getUserDetails, {
//     variables: {
//       id,
//     },
//   });
//   return {
//     data,
//     error,
//     loading,
//   };
// };
