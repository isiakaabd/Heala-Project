import * as Yup from "yup";
import { isFile } from "./filterHelperFunctions";

export const addDoctorValidationSchema = Yup.object({
  firstName: Yup.string("Enter your firstName")
    .trim()
    .required("firstName is required"),
  hospital: Yup.string("Enter your hosptial")
    .trim()
    .required("hospital is required"),
  dob: Yup.date("required")
    .typeError(" Enter a valid DOB")
    .required(" DOB required"),
  dociId: Yup.string("Enter dociId").trim().required("DociId required"),
  gender: Yup.string("select your Gender").required("Select a gender"),
  phone: Yup.number("Enter your Phone Number")
    .typeError(" Enter a valid phone number")
    .min(11, "min value is  11 digits")
    .required("Phone number is required"),
  lastName: Yup.string("Enter your lastName")
    .trim()
    .required("LastName is required"),
  image: Yup.string("Upload a single Image")
    .typeError("Pick correct image")
    .required("Image is required"),
  specialization: Yup.string("select your Specialization")
    .trim()
    .required("Specialization is required"),
  cadre: Yup.string("select your Cadre").trim().required("Cadre is required"),
});

export const addTestValidation = Yup.object({
  name: Yup.string("Enter name of test")
    .trim()
    .required("Test name is required"),
  price: Yup.number("Enter test amount")
    .typeError(" Enter a number a price")
    .required("Test price is required"),
  tat: Yup.number("Enter TAT for this test")
    .typeError(" Enter a number a Turnaround time in minutes")
    .required("TAT is required"),
});
export const addProviderValidation = Yup.object({
  name: Yup.string("Enter Provider name")
    .trim()
    .required("Test name is required"),
});

export const editTestValidation = Yup.object({
  id: Yup.string().trim().required(),
  name: Yup.string("Enter name of test")
    .trim()
    .required("Test name is required"),
  price: Yup.number("Enter test amount")
    .typeError(" Enter a number a price")
    .required("Test price is required"),
  tatNumber: Yup.string("Enter TAT for this test").required("TAT is required"),
  tatDuration: Yup.string("Select an option").required(
    "This field is required."
  ),
});

export const uploadFileValidationSchema = Yup.object({
  testFile: Yup.mixed()
    .required("Select a .JSON file to proceed.")
    .test("type", "Only .JSON files are supported", (value) => {
      return value && value.type === "application/json";
    }),
});

export const uploadEnrolleeFileValidationSchema = Yup.object({
  planId: Yup.string("Please select a plan").required("Plan is required."),
  file: Yup.mixed()
    .required("Select a .CSV file to proceed.")
    .test("type", "Only .CSV files are supported", (value) => {
      const isCSVFile = isFile(value, "csv");
      return isCSVFile;
    }),
});

export const filterPartnersValidationSchema = Yup.object({
  Name: Yup.string("Select your Name").trim().required("Name is required"),
  cadre: Yup.string("Select your Cadre").trim().required("Cadre is required"),
  date: Yup.string("Date your hospital").required("Date is required"),
  specialization: Yup.string("select your specialization")
    .trim()
    .required("specialization is required"),
});

export const addPartnerValidationSchema = Yup.object({
  category: Yup.string("select your Category")
    .trim()
    .required("Category is required"),
});

export const addNewPartnerValidationSchema = Yup.object({
  name: Yup.string("Enter your name").trim().required("Name is required"),
  image: Yup.string("Upload a single Image")
    .typeError("Must be an Image ,png,jpg")
    .required("Image is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .trim()
    .required("Email is required"),
  account: Yup.number("Enter a valid account number")
    .typeError("Please enter a valid Account number")
    .required("Account number is required"),
  phone: Yup.number("Enter a valid Phone number")
    .typeError("Please enter a valid phone number")
    .required("Phone number is required"),
  address: Yup.string("Enter Address ").required("Address is required"),
  provider: Yup.string("select a provider").trim(),
  bank: Yup.string("select a Bank").required("Select a Bank"),
  classification: Yup.string("select a classification").trim(),
  specialization: Yup.string("select a specialization").trim(),
  category: Yup.string("select your category").required("category is required"),
});

export const hmoValidationSchema = Yup.object({
  name: Yup.string("Enter HMO name").trim().required("HMO name is required"),
  iconAlt: Yup.string("provide alternative icon").trim(),
  icon: Yup.string("provide icon").trim().required("Icon is required"),
  userTypeId: Yup.string("Select type of provider")
    .trim()
    .required("Provider type is required"),
  email: Yup.string("Enter email address")
    .email("Enter a valid email")
    .trim()
    .required("Email is required"),
  phone: Yup.number("Enter your Phone Number")
    .typeError(" Enter a valid phone number")
    .min(11, "min value is  11 digits")
    .required("Phone number is required"),
  address: Yup.string("Enter HMO address").required(" Address is required"),
});

export const addHMOEnrolleeValidationSchema = Yup.object({
  id: Yup.string("enter id").trim(),
  firstName: Yup.string("Enter first name")
    .trim()
    .required("First name is required"),
  lastName: Yup.string("Enter last name")
    .trim()
    .required("Last name is required"),
  email: Yup.string("Enter email address")
    .email("Enter a valid email")
    .trim()
    .required("Email is required"),
  phone: Yup.number("Enter your Phone Number")
    .typeError(" Enter a valid phone number")
    .min(11, "min value is  11 digits")
    .required("Phone number is required"),
  photo: Yup.string("provide photo")
    .typeError("Please provider a photo")
    .trim(),
  hmoId: Yup.string("Enter HMO ID").trim().required("HMO ID is required"),
  noc: Yup.string("Enter NOC").trim(),
  plan: Yup.string("Enter HMO plan").trim().required("HMO Plan is required"),
  planId: Yup.string("Select Heala plan")
    .trim()
    .required("Heala Plan is required"),
  expiryDate: Yup.date("Enter HMO plan expiry date")
    .typeError("Please select a valid date")
    .required("Expiry date is Required"),
});

export const addEditPlansValidationSchema = Yup.object({
  id: Yup.string("Enter Description").trim(),
  name: Yup.string("Enter your Name").trim().required("Name is required"),
  amount: Yup.number("Enter your Amount").typeError(" Enter a valid amount"),
  description: Yup.string("Enter Description")
    .trim()
    .required("Description is required"),
  provider: Yup.string("Enter Provider").trim(),
  accessType: Yup.string("Enter Duration").trim(),
});
export const illnessSchema = Yup.object({
  name: Yup.string("Enter illness name")
    .trim()
    .required("illness name is required"),
  description: Yup.string("Enter illness description").required(
    "description is required"
  ),
});
