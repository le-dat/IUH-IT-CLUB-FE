import { FORM_SIGN_AUTH } from "@/constants/form";
import * as yup from "yup";

export const validationLoginSchema = yup.object().shape({
  [FORM_SIGN_AUTH.email]: yup
    .string()
    .required("Email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
  [FORM_SIGN_AUTH.password]: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 8 characters long"),
  // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  // .matches(/[0-9]/, 'Password must contain at least one number')
  // .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
});

export const validationSignUpSchema = yup.object().shape({
  [FORM_SIGN_AUTH.name]: yup
    .string()
    .trim()
    .required("First name is required")
    .matches(/^[A-Za-z\s]*$/, "First name cannot contain special characters"),
  ...validationLoginSchema.fields,
});
