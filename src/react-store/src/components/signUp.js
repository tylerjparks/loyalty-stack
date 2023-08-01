import React from "react";
import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UserAddress from "./userAddress";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../src/css/main.css";

export default function SignUp({ handleChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [loyaltyProgram, setLoyaltyProgram] = useState(true);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    termsAndConditions: false,
  };

  const phoneRegExp = /^[a-zA-Z0-9.\-_]+$/;
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(3, "It's too short").required("Required"),
    lastname: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    username: Yup.string().min(5, "It's too short").required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
    phoneNumber: Yup.string()
      .required("required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(12, "too short")
      .max(12, "too long"),
    termsAndConditions: Yup.string().oneOf(
      ["true"],
      "Accept terms & conditions"
    ),
  });
  const onSubmit = (values, props) => {
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  
  const getUserInputs = () => {
    // get user input data
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const zipCode = document.getElementById("zipcode").value;
    const customerStateAddress = document.getElementById("us-states-choices").innerHTML;
    const loyaltyProgramInput = loyaltyProgram;

    const userData = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      address: address,
      city: city,
      country: "US",
      state: customerStateAddress,
      postal: zipCode,
      phone: phone,
      joinLoyalty: loyaltyProgramInput,
    };

    // post user info to backend. Will not work if user is already registered
    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((response) => {
        let createUser = {
          username: username,
          password: userPassword,
          customerId: response.id,
          roles: ["ROLE_USER"],
        };
        fetch(process.env.REACT_APP_API_ENDPOINT + "/api/auth/register", {
          method: "POST",
          body: JSON.stringify(createUser),
          headers: { "Content-Type": "application/json" },
        })
          .then((createUserResponse) => {
            createUserResponse.json();
          })
          .then(() => {
            handleChange("event", 0);
            alert("User created successfully. Please login.");
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Grid>
      <Paper className="paper-signup">
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#9c27b0" }}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className="signup-header">Sign Up</h2>
          <Typography component={"div"} variant="caption" gutterBottom>
            Please fill this form to create an account!
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          initialTouched={{field: true}}
          validateOnMount={true}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form className="signup-form">
              <InputLabel id="demo-simple-select-label">
                Customer Information
              </InputLabel>
              <Field
                as={TextField}
                id="firstname"
                name="firstname"
                label="First Name"
                placeholder="Enter your first name"
                helperText={<ErrorMessage name="firstname" />}
                color="secondary"
                style={{
                  maxWidth: "177px",
                  marginTop: "8px",
                  marginBottom: "5px",
                  marginTop: "10px",
                }}
              />
              <Field
                as={TextField}
                id="lastname"
                name="lastname"
                label="Last Name"
                placeholder="Enter your last name"
                helperText={<ErrorMessage name="lastname" />}
                color="secondary"
                style={{
                  marginLeft: "5px",
                  maxWidth: "177px",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
              />
              <Field
                as={TextField}
                id="email"
                name="email"
                fullWidth
                label="Email"
                placeholder="Enter your email"
                color="secondary"
                helperText={<ErrorMessage name="email" />}
                style={{ marginTop: "8px", marginBottom: "5px" }}
              />
              <Field
                as={TextField}
                id="username"
                name="username"
                fullWidth
                label="Username"
                placeholder="Create an username"
                color="secondary"
                style={{ marginTop: "8px", marginBottom: "5px" }}
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                fullWidth
                id="password"
                name="password"
                label="Password"
                placeholder="Create a password"
                color="secondary"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{ marginTop: "8px", marginBottom: "5px" }}
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                id="password-confirm"
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                color="secondary"
                onBlur={(e) => {
                  setUserPassword(e.currentTarget.value);
                }}
                helperText={<ErrorMessage name="confirmPassword" />}
                style={{ marginTop: "8px", marginBottom: "5px" }}
              />
              <UserAddress />

              <Field
                as={TextField}
                id="phone"
                label="Phone Number"
                name="phoneNumber"
                placeholder="XXX-XXX-XXXX"
                color="secondary"
                style={{ marginTop: "8px", marginBottom: "5px" }}
                fullWidth
                helperText={<ErrorMessage name="phoneNumber" />}
              />
              <FormControlLabel
                control={
                  <Field
                    as={Checkbox}
                    name="termsAndConditions"
                    color="secondary"
                  />
                }
                label="I accept the terms and conditions."
                style={{ marginBottom: "5px" }}
              />
              <FormHelperText>
                <ErrorMessage name="termsAndConditions" />
              </FormHelperText>
              <FormControlLabel
                id="loyalty"
                control={
                  <Field
                    as={Checkbox}
                    name="joinLoyaltyProgram"
                    color="secondary"
                  />
                }
                label="Enter loyalty program and earn points!"
                style={{ marginBottom: "5px" }}
                checked={loyaltyProgram}
                onClick={() => {
                  setLoyaltyProgram(!loyaltyProgram);
                }}
              />
              <Typography component={"div"}>
                {" "}
                Already have an account?{" "}
                <Link href="#" onClick={() => handleChange("event", 0)}>
                  Login here!
                </Link>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting || !props.isValid}
                color="secondary"
                onClick={() => {
                  getUserInputs();
                }}
              >
                {props.isSubmitting ? "Loading" : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}
