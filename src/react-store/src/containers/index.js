import React, { useState } from "react";
import { Tab, Tabs, Paper, Box, Typography } from "@mui/material";
import Login from "../components/login";
import SignUp from "../components/signUp";

export default function SignInOutContainer() {
  const [value, SetValue] = useState(0);
  const handleChange = (e, newValue) => {
    SetValue(newValue);
  };
  const paperStyle = { width: 430, margin: "20px auto" };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={"div"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Login" />

        <Tab label="Sign Up" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp handleChange={handleChange} />
      </TabPanel>
    </Paper>
  );
}
