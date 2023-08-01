import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../src/css/main.css";

const Login = ({ handleChange, user, setUser }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const initialValues = {
    username: "",
    password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5, "It's too short").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    const { username, password } = values;
    if (username === "") {
      alert("Username is required");
    } else if (password === "") {
      alert("Password is required");
    } else {
      const userLoginInfo = {
        username: username,
        password: password,
      };
      localStorage.setItem("userLoginInfo", JSON.stringify(userLoginInfo));
      fetch(process.env.REACT_APP_API_ENDPOINT + `/api/auth/signin`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(userLoginInfo),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          const jwt = result.token;
          localStorage.setItem("jwt", jwt);
          setLogin(true);
          alert(`Login successful. Welcome ${username}!`);
        })
        .then( () => {
          let token = localStorage.getItem("jwt");
          let bearer = "Bearer " + token;
          fetch(process.env.REACT_APP_API_ENDPOINT + "/api/me", {
            mode:"cors",
            method:"GET",
            headers: {
              "Authorization": bearer
            }
          })
          .then((res) => res.json())
          .then((userResult) => {
              console.log("Logged in user: ", userResult);
              setUser(userResult);
          });
        })
        .catch((err) => {
          console.log(err.message);
          alert(
            "Login failed. Please check your username and password and try again."
          );
        });
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Set User: ", user);
      navigate("/profile");
    }
  }, [user]);

  return (
    <Grid>
      <Paper className="paper">
        <Grid align="center">
          <Avatar style={{ background: "#9c27b0" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Username"
                name="username"
                placeholder="Enter username"
                fullWidth
                required
                className="login-input"
                color="secondary"
                helperText={
                  <ErrorMessage name="username" className="error-message" />
                }
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                fullWidth
                required
                color="secondary"
                className="login-input"
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
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="secondary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                className="login-submit-button"
                fullWidth
                color="secondary"
              >
                {props.isSubmitting ? "Loading" : "Sign in"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#">Forgot password?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account?{" "}
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
