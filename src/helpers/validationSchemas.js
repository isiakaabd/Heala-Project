import * as Yup from "yup";

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
