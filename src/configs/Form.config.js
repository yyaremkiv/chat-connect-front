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
  },
  loginSchema: Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .email("Please enter a valid email address.")
      .min(4, "Email must be at least 3 characters long.")
      .max(50, "Email cannot be longer than 50 characters.")
      .required("Email is required."),
    password: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .required("Password is required."),
  }),
  registerSchema: Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(3, "First name must be at least 3 characters long.")
      .max(50, "First name cannot be longer than 50 characters.")
      .required("First name is required."),
    lastName: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(3, "Last name must be at least 3 characters long.")
      .max(50, "Last name cannot be longer than 50 characters.")
      .required("Last name is required."),
    email: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .email("Please enter a valid email address.")
      .min(4, "Email must be at least 3 characters long.")
      .max(50, "Email cannot be longer than 50 characters.")
      .required("Email is required."),
    password: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .required("Password is required."),
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
    firstName: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(3, "First name must be at least 3 characters long.")
      .max(50, "First name cannot be longer than 50 characters.")
      .required("First name is required."),
    lastName: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(3, "Last name must be at least 3 characters long.")
      .max(50, "Last name cannot be longer than 50 characters.")
      .required("Last name is required."),
    email: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .email("Please enter a valid email address.")
      .min(4, "Email must be at least 3 characters long.")
      .max(50, "Email cannot be longer than 50 characters.")
      .required("Email is required."),
    location: Yup.string().max(
      50,
      "Location must be no more than 50 characters"
    ),
    occupation: Yup.string().max(
      50,
      "Occupation must be no more than 50 characters"
    ),
    twitter: Yup.string().max(
      50,
      "Twitter link must be no more than 50 characters"
    ),
    linkendin: Yup.string().max(
      50,
      "Linkedins link must be no more than 50 characters"
    ),
  }),
  postSchema: Yup.object().shape({
    text: Yup.string()
      .required("This field is required")
      .matches(/^(?!\s)(?!.*\s$)/, "Text cannot start or end with spaces.")
      .min(6, "Post must be at least 6 characters long.")
      .max(200, "Post cannot be longer than 200 characters."),
  }),
  commentSchema: Yup.object().shape({
    text: Yup.string()
      .required("This field is required")
      .matches(/^(?!\s)(?!.*\s$)/, "Text cannot start or end with spaces.")
      .min(6, "Comment must be at least 6 characters long.")
      .max(200, "Comment cannot be longer than 200 characters."),
  }),
  typePage: {
    login: "login",
    register: "register",
  },
};
