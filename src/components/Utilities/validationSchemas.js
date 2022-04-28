import * as Yup from "yup";

export const filterByGenderValidationSchema = Yup.object({
  name: Yup.string("Enter your hospital").trim(),
  bloodGroup: Yup.string("ENter your bloodGroup").trim(),
  gender: Yup.string("Select your gender").trim(),
  phone: Yup.number("Enter your specialization").typeError(
    "Enter a current Number"
  ),
});
