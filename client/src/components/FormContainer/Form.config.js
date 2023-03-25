import * as Yup from "yup";

export const FormConfig = {
  initialValuesLogin: {
    email: "",
    password: "",
  },
  initialValuesRegister: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
  },
  loginSchema: Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("required"),
  }),
  registerSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters long.")
      .max(50, "First name cannot be longer than 50 characters.")
      .required("First name is required."),
    lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters long.")
      .max(50, "Last name cannot be longer than 50 characters.")
      .required("Last name is required."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .max(50, "Email cannot be longer than 50 characters.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .required("required"),
    location: Yup.string().max(
      50,
      "Location must be no more than 50 characters"
    ),
    occupation: Yup.string().max(
      50,
      "Occupation must be no more than 50 characters"
    ),
  }),
  updateSchema: Yup.object().shape({
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("required"),
    location: Yup.string().required("required"),
    occupation: Yup.string().required("required"),
    twitter: Yup.string(),
    linkendin: Yup.string(),
    picture: Yup.string(),
  }),
  typePage: {
    login: "login",
    register: "register",
  },
};
