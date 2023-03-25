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
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("required"),
    location: Yup.string().required("required"),
    occupation: Yup.string().required("required"),
    picture: Yup.string().required("required Please load image"),
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
    // picture: Yup.string().required("required Please load image"),
  }),
  typePage: {
    login: "login",
    register: "register",
  },
};
