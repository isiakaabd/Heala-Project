import { gql } from "@apollo/client";

export const updateDoctorProvider = gql`
  mutation updateDoctorProvider($dociId: String, $providerId: String) {
    updateDoctorProvider(data: { dociId: $dociId, providerId: $providerId }) {
      profile {
        _id
        dociId
        createdAt
        updatedAt
        firstName
        lastName
        gender
        phoneNumber
        email
        hospital
        specialization
        dob
        cadre
        picture
        providerId
      }
      account {
        _id
        email
        dociId
        createdAt
        updatedAt
        isEmailVerified
        role
        providerId
        userTypeId
        enrolleeNumber
        isPasswordTemporary
      }
    }
  }
`;
export const createProvider = gql`
  mutation createProvider($name: String!, $userTypeId: String!) {
    createProvider(data: { name: $name, userTypeId: $userTypeId }) {
      provider {
        _id
        name
        icon
        userTypeId
        createdAt
        updatedAt
      }
      message
      errors {
        field
        message
      }
    }
  }
`;
export const editUserType = gql`
  mutation updateUserType(
    $id: String!
    $name: String
    $description: String
    $icon: String!
  ) {
    updateUserType(
      data: { id: $id, name: $name, icon: $icon, description: $description }
    ) {
      userType {
        _id
        name
        icon
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export const updateIllness = gql`
  mutation updateIllness($id: String!, $name: String, $description: String) {
    updateIllness(data: { id: $id, name: $name, description: $description }) {
      illness {
        _id
        name
        description
        updatedAt
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export const regeneratePartnerProfileUrl = gql`
  mutation regeneratePartnerProfileUrl($id: String) {
    regeneratePartnerProfileUrl(data: { id: $id }) {
      partner {
        _id
        name
        email
        category
        logoImageUrl
        profileUrl
        accountId
        dociId
      }
      errors {
        field
        message
      }
    }
  }
`;
export const regenerateProviderProfileUrl = gql`
  mutation regenerateProviderProfileUrl($id: String!) {
    regenerateProviderProfileUrl(data: { id: $id }) {
      provider {
        _id
        name
        icon
        userTypeId
        profileUrl
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export const deleteIllness = gql`
  mutation deleteIllness($id: String!) {
    deleteIllness(data: { id: $id }) {
      count
      message
      errors {
        field
        message
      }
    }
  }
`;
export const verifyHCP = gql`
  mutation verifyHCP($id: String) {
    verifyHCP(data: { id: $id }) {
      _id
      qualification
      license
      yearbook
      alumni_association
      reference
      external_reference
      status
      createdAt
      updatedAt
      profileId
    }
  }
`;
export const createIllness = gql`
  mutation createIllness($name: String!, $description: String) {
    createIllness(data: { name: $name, description: $description }) {
      illness {
        _id
        name
        description
        updatedAt
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export const editprovider = gql`
  mutation updateProvider(
    $id: String!
    $name: String!
    $icon: String!
    $iconAlt: String
    $email: String
    $phone: String
    $address: String
  ) {
    updateProvider(
      data: {
        id: $id
        name: $name
        icon: $icon
        iconAlt: $iconAlt
        email: $email
        phone: $phone
        address: $address
      }
    ) {
      provider {
        _id
        name
        icon
        userTypeId
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export const Login_USER = gql`
  mutation Login($data: LoginUserInput!) {
    login(data: $data) {
      message
      account {
        _id
        dociId
        access_token
        refresh_token
        role
        userTypeId
        email
      }
      errors {
        message
      }
    }
  }
`;
export const rejectVerification = gql`
  mutation rejectVerification($reason: String, $id: String) {
    rejectVerification(data: { verificationId: $id, reason: $reason }) {
      message
      reason
    }
  }
`;
export const CREATE_PLAN = gql`
  mutation createPlan(
    $name: String!
    $amount: Float!
    $description: String
    $duration: String
    $provider: String
    $type: String
    $consultation: String
  ) {
    createPlan(
      data: {
        name: $name
        amount: $amount
        description: $description
        duration: $duration
        provider: $provider
        type: $type
        allowedFeatures: { consultation: $consultation }
      }
    ) {
      plan {
        _id
        name
        amount
        description
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export const DELETE_PLAN = gql`
  mutation deletePlan($id: String!) {
    deletePlan(data: { id: $id }) {
      count
      message
      errors {
        field
        message
      }
    }
  }
`;
export const UPDATE_PLAN = gql`
  mutation updatePlan(
    $id: String
    $name: String
    $amount: Float
    $provider: String
    $duration: String
    $description: String
    $consultation: String
  ) {
    updatePlan(
      data: {
        id: $id
        name: $name
        amount: $amount
        provider: $provider
        duration: $duration
        description: $description
        allowedFeatures: { consultation: $consultation }
      }
    ) {
      plan {
        _id
        name
        amount
        description
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export const CREATE_PERMISSION = gql`
  mutation createPermission($name: String!, $description: String!) {
    createPermission(data: { name: $name, description: $description }) {
      permission {
        _id
        name
        description
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export const UPDATE_PERMISSION = gql`
  mutation updatePermission(
    $id: String!
    $name: String!
    $description: String!
  ) {
    updatePermission(
      data: { id: $id, name: $name, description: $description }
    ) {
      permission {
        _id
        name
        description
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export const DELETE_PERMISSION = gql`
  mutation deletePermission($id: String!) {
    deletePermission(data: { id: $id }) {
      count
      message
      errors {
        field
        message
      }
    }
  }
`;
export const deleteRole = gql`
  mutation deleteRole($id: String!) {
    deleteRole(data: { id: $id }) {
      count
      message
      errors {
        field
        message
      }
    }
  }
`;
export const updateAppointment = gql`
  mutation updateAppointment(
    $id: String!
    $doctor: String!
    $patient: String
    $date: String!
    $time: String
  ) {
    updateAppointment(
      data: {
        id: $id
        doctor: $doctor
        patient: $patient
        date: $date
        time: $time
      }
    ) {
      appointment {
        _id
        doctor
        patient
        date
        time
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

// message
export const CREATE_MESSAGE = gql`
  mutation createMessage(
    $recipient: String!
    $sender: String!
    $subject: String!
    $body: String!
  ) {
    createMessage(
      data: {
        recipient: $recipient
        sender: $sender
        subject: $subject
        body: $body
      }
    ) {
      messages {
        _id
        recipient
        subject
        sender
        createdAt
        updatedAt
        body
      }
      errors {
        field
        message
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logout($user: String!, $deviceId: String) {
    logout(data: { user: $user, deviceId: $deviceId }) {
      result
    }
  }
`;
export const getNewAccessToken = gql`
  mutation refreshToken {
    refreshToken {
      account {
        access_token
        refresh_token
      }
    }
  }
`;
export const deleteProfile = gql`
  mutation deleteProfile($id: String!) {
    deleteProfile(data: { id: $id }) {
      count
      errors {
        field
        message
      }
    }
  }
`;
export const createRole = gql`
  mutation createRole(
    $name: String!
    $editable: Boolean!
    $description: String!
    $permissions: [String!]
  ) {
    createRole(
      data: {
        name: $name
        editable: $editable
        description: $description
        permissions: $permissions
      }
    ) {
      role {
        _id
        name
        permissions
        editable
        description
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export const createReminder = gql`
  mutation createReminder {
    createReminder(
      data: {
        date: "2021-08-15T23:19:02+01:00"
        description: "wake me up for my appointment"
        patient: "6116f2828497025413dcec5d"
        type: "appointment"
        interval: "daily"
      }
    ) {
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
      message
      errors {
        field
        message
      }
    }
  }
`;
export const deleteAppointment = gql`
  mutation deleteAppointment($id: String!) {
    deleteAppointment(data: { id: $id }) {
      count
      message
      errors {
        field
        message
      }
    }
  }
`;
export const addRole = gql`
  mutation createRole(
    $name: String!
    $editable: Boolean
    $description: String
    $permissions: [String!]
  ) {
    createRole(
      data: {
        name: $name
        editable: $editable
        description: $description
        permissions: $permissions
      }
    ) {
      role {
        _id
        name
        permissions
        editable
        description
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export const editRole = gql`
  mutation updateRole(
    $id: String!
    $name: String
    $description: String
    $permissions: [String!]
  ) {
    updateRole(
      data: {
        id: $id
        name: $name
        permissions: $permissions
        description: $description
      }
    ) {
      role {
        _id
        name
        permissions
        editable
        description
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export const requestReferral = gql`
  mutation requestReferral(
    $doctor: String!
    $patient: String!
    $type: String!
    $reason: String!
    $note: String!
    $specialization: String!
  ) {
    requestReferral(
      data: {
        doctor: $doctor
        patient: $patient
        type: $type
        reason: $reason
        note: $note
        specialization: $specialization
      }
    ) {
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
      errors {
        field
        message
      }
    }
  }
`;
export const deleteDoctor = gql`
  mutation deleteDoctorProfile($id: String!) {
    deleteDoctorProfile(data: { id: $id }) {
      count
      errors {
        field
        message
      }
    }
  }
`;
export const addPartner = gql`
  mutation addPartner(
    $name: String!
    $category: String!
    $providerId: String!
    $email: String!
    $logoImageUrl: String!
  ) {
    addPartner(
      data: {
        name: $name
        category: $category
        providerId: $providerId
        email: $email
        logoImageUrl: $logoImageUrl
      }
    ) {
      partner {
        _id
        name
        email
        category
        logoImageUrl
      }
      errors {
        field
        message
      }
    }
  }
`;
export const addPartnerCategory = gql`
  mutation addPartnerCategory($name: String!) {
    addPartnerCategory(data: { name: $name }) {
      category {
        _id
        name
      }
      errors {
        field
        message
      }
    }
  }
`;
export const addProvider = gql`
  mutation createProvider(
    $name: String!
    $icon: String!
    $iconAlt: String
    $userTypeId: String!
    $email: String
    $phone: String
    $address: String
  ) {
    createProvider(
      data: {
        name: $name
        icon: $icon
        iconAlt: $iconAlt
        userTypeId: $userTypeId
        email: $email
        phone: $phone
        address: $address
      }
    ) {
      provider {
        _id
        name
        iconAlt
        icon
        userTypeId
        createdAt
        updatedAt
      }
      message
      errors {
        field
        message
      }
    }
  }
`;
export const deletProvider = gql`
  mutation deleteProvider($id: String!) {
    deleteProvider(data: { id: $id }) {
      count
      message
      errors {
        field
        message
      }
    }
  }
`;
export const deleteUserType = gql`
  mutation deleteUserType($id: String!) {
    deleteUserType(data: { id: $id }) {
      count
      message
      errors {
        field
        message
      }
    }
  }
`;
export const signup = gql`
  mutation signup(
    $authType: String!
    $email: EmailAddress!
    $password: String!
    $role: String
  ) {
    signup(
      data: {
        authType: $authType
        email: $email
        password: $password
        role: $role
      }
    ) {
      account {
        _id
        email
      }
      message
      errors {
        field
        message
      }
    }
  }
`;
export const createUserType = gql`
  mutation createUserType($name: String!, $icon: String!) {
    createUserType(data: { name: $name, icon: $icon }) {
      userType {
        _id
        name
        icon
        createdAt
        updatedAt
      }
      message
      errors {
        field
        message
      }
    }
  }
`;
export const createAllery = gql`
  mutation createAllergy(
    $food: String!
    $medication: String!
    $profile: String!
    $severity: String!
  ) {
    createAllergy(
      data: {
        food: $food
        medication: $medication
        profile: $profile
        severity: $severity
      }
    ) {
      allergy {
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
export const createDOctorProfile = gql`
  mutation createDoctorProfile(
    $firstName: String!
    $lastName: String!
    $gender: String
    $dociId: String!
    $phoneNumber: String!
    $hospital: String!
    $specialization: String!
    $dob: String!
    $cadre: String!
    $image: String!
    $providerId: String
  ) {
    createDoctorProfile(
      data: {
        firstName: $firstName
        lastName: $lastName
        gender: $gender
        phoneNumber: $phoneNumber
        dociId: $dociId
        hospital: $hospital
        specialization: $specialization
        dob: $dob
        cadre: $cadre
        image: $image
        providerId: $providerId
      }
    ) {
      profile {
        _id
        dociId
        createdAt
        updatedAt
        firstName
        lastName
        gender
        phoneNumber
        email
        hospital
        specialization
        dob
        cadre
        picture
      }
      errors {
        field
        message
      }
    }
  }
`;

export const addTest = gql`
  mutation addDiagnosticLabTest($name: String, $price: Float, $tat: String) {
    addDiagnosticLabTest(data: { name: $name, price: $price, tat: $tat }) {
      diagnosticLabTest {
        _id
        partner
        name
        price
        tat
      }
      errors {
        field
        message
      }
    }
  }
`;

export const uploadTests = gql`
  mutation uploadDiagnosticLabTests($fileUrl: String!) {
    uploadDiagnosticLabTests(
      data: { fileUrl: $fileUrl, bucket: "heala-media" }
    ) {
      result {
        fileUrl
        totalInserted
        bucket
      }
      errors {
        field
        message
      }
    }
  }
`;

export const UPDATE_TEST = gql`
  mutation updateDiagnosticLabTest(
    $id: String!
    $name: String!
    $price: Float!
    $tat: String!
  ) {
    updateDiagnosticLabTest(
      data: { id: $id, name: $name, price: $price, tat: $tat }
    ) {
      diagnosticLabTest {
        _id
        partner
        name
        price
        tat
      }
      errors {
        field
        message
      }
    }
  }
`;

export const createEnrollee = gql`
  mutation createEnrollee(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $photo: String
    $hmoId: String!
    $noc: Int
    $plan: String!
    $expiryDate: String!
    $providerId: String!
    $planId: String
  ) {
    createEnrollee(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        hmoId: $hmoId
        noc: $noc
        phone: $phone
        photo: $photo
        plan: $plan
        expiryDate: $expiryDate
        providerId: $providerId
        planId: $planId
      }
    ) {
      enrollee {
        _id
        firstName
        lastName
        hmoId
        phone
        providerId
      }
      errors {
        field
      }
    }
  }
`;

export const uploadHMOEnrollees = gql`
  mutation uploadEnrollees(
    $fileUrl: String!
    $providerId: String!
    $planId: String!
  ) {
    uploadEnrollees(
      data: {
        fileUrl: $fileUrl
        providerId: $providerId
        bucket: "heala-media"
        planId: $planId
      }
    ) {
      result {
        fileUrl
        totalInserted
        bucket
      }
      errors {
        field
        message
      }
    }
  }
`;

export const updateEnrollee = gql`
  mutation updateEnrollee(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String
    $photo: String
    $hmoId: String!
    $plan: String
    $expiryDate: String!
    $providerId: String!
  ) {
    updateEnrollee(
      data: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
        hmoId: $hmoId
        phone: $phone
        photo: $photo
        plan: $plan
        expiryDate: $expiryDate
        providerId: $providerId
      }
    ) {
      enrollee {
        _id
        firstName
        lastName
        hmoId
        phone
      }
      errors {
        field
        message
      }
    }
  }
`;

export const deleteEnrollee = gql`
  mutation deleteEnrollee($id: String) {
    deleteEnrollee(data: { id: $id }) {
      count
      errors {
        field
        message
      }
    }
  }
`;
