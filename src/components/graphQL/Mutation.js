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
export const CREATE_PLAN = gql`
  mutation createPlan($name: String!, $amount: Float!, $description: String!) {
    createPlan(data: { name: $name, amount: $amount, description: $description }) {
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
  mutation updatePlan($id: String!, $name: String!, $amount: Float!, $description: String!) {
    updatePlan(data: { id: $id, name: $name, amount: $amount, description: $description }) {
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
  mutation updatePermission($id: String!, $name: String!, $description: String!) {
    updatePermission(data: { id: $id, name: $name, description: $description }) {
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

// message
export const CREATE_MESSAGE = gql`
  mutation createMessage($recipient: String!, $sender: String!, $subject: String!, $body: String!) {
    createMessage(
      data: { recipient: $recipient, sender: $sender, subject: $subject, body: $body }
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
  mutation logout {
    logout
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
  mutation addPartner($name: String!, $category: String!, $email: String!, $plan: String!) {
    addPartner(data: { name: $name, category: $category, email: $email, plan: $plan }) {
      partner {
        _id
        name
        email
        category
        plan
        logoImageUrl
      }
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
      data: { food: $food, medication: $medication, profile: $profile, severity: $severity }
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
