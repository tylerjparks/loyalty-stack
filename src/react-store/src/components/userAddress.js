import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function UserAddress() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value.toString());
  };

  const initialValues = {
    address: "",
    city: "",
    state: "",
    zipcode: "",
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().min(2, "State is required").required("Required"),
    zipcode: Yup.string().min(5, "It's too short").required("Required"),
  });

  var usStates = [
    { name: "ALABAMA", abbreviation: "AL" },
    { name: "ALASKA", abbreviation: "AK" },
    { name: "AMERICAN SAMOA", abbreviation: "AS" },
    { name: "ARIZONA", abbreviation: "AZ" },
    { name: "ARKANSAS", abbreviation: "AR" },
    { name: "CALIFORNIA", abbreviation: "CA" },
    { name: "COLORADO", abbreviation: "CO" },
    { name: "CONNECTICUT", abbreviation: "CT" },
    { name: "DELAWARE", abbreviation: "DE" },
    { name: "DISTRICT OF COLUMBIA", abbreviation: "DC" },
    { name: "FEDERATED STATES OF MICRONESIA", abbreviation: "FM" },
    { name: "FLORIDA", abbreviation: "FL" },
    { name: "GEORGIA", abbreviation: "GA" },
    { name: "GUAM", abbreviation: "GU" },
    { name: "HAWAII", abbreviation: "HI" },
    { name: "IDAHO", abbreviation: "ID" },
    { name: "ILLINOIS", abbreviation: "IL" },
    { name: "INDIANA", abbreviation: "IN" },
    { name: "IOWA", abbreviation: "IA" },
    { name: "KANSAS", abbreviation: "KS" },
    { name: "KENTUCKY", abbreviation: "KY" },
    { name: "LOUISIANA", abbreviation: "LA" },
    { name: "MAINE", abbreviation: "ME" },
    { name: "MARSHALL ISLANDS", abbreviation: "MH" },
    { name: "MARYLAND", abbreviation: "MD" },
    { name: "MASSACHUSETTS", abbreviation: "MA" },
    { name: "MICHIGAN", abbreviation: "MI" },
    { name: "MINNESOTA", abbreviation: "MN" },
    { name: "MISSISSIPPI", abbreviation: "MS" },
    { name: "MISSOURI", abbreviation: "MO" },
    { name: "MONTANA", abbreviation: "MT" },
    { name: "NEBRASKA", abbreviation: "NE" },
    { name: "NEVADA", abbreviation: "NV" },
    { name: "NEW HAMPSHIRE", abbreviation: "NH" },
    { name: "NEW JERSEY", abbreviation: "NJ" },
    { name: "NEW MEXICO", abbreviation: "NM" },
    { name: "NEW YORK", abbreviation: "NY" },
    { name: "NORTH CAROLINA", abbreviation: "NC" },
    { name: "NORTH DAKOTA", abbreviation: "ND" },
    { name: "NORTHERN MARIANA ISLANDS", abbreviation: "MP" },
    { name: "OHIO", abbreviation: "OH" },
    { name: "OKLAHOMA", abbreviation: "OK" },
    { name: "OREGON", abbreviation: "OR" },
    { name: "PALAU", abbreviation: "PW" },
    { name: "PENNSYLVANIA", abbreviation: "PA" },
    { name: "PUERTO RICO", abbreviation: "PR" },
    { name: "RHODE ISLAND", abbreviation: "RI" },
    { name: "SOUTH CAROLINA", abbreviation: "SC" },
    { name: "SOUTH DAKOTA", abbreviation: "SD" },
    { name: "TENNESSEE", abbreviation: "TN" },
    { name: "TEXAS", abbreviation: "TX" },
    { name: "UTAH", abbreviation: "UT" },
    { name: "VERMONT", abbreviation: "VT" },
    { name: "VIRGIN ISLANDS", abbreviation: "VI" },
    { name: "VIRGINIA", abbreviation: "VA" },
    { name: "WASHINGTON", abbreviation: "WA" },
    { name: "WEST VIRGINIA", abbreviation: "WV" },
    { name: "WISCONSIN", abbreviation: "WI" },
    { name: "WYOMING", abbreviation: "WY" },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label" style={{ marginBottom: "5px" }}>
        Address{" "}
      </InputLabel>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {(props) => (
          <Form>
            <Field
              as={TextField}
              id="address"
              name="address"
              fullWidth
              label="Address"
              placeholder="Address"
              color="secondary"
              style={{ marginTop: "8px", marginBottom: "5px" }}
              helperText={<ErrorMessage name="address" />}
            />
            <Field
              as={TextField}
              id="city"
              name="city"
              label="City"
              placeholder="City"
              color="secondary"
              helperText={<ErrorMessage name="city" />}
              style={{
                marginTop: "8px",
                marginBottom: "5px",
                width: "150px",
                marginRight: "5px",
              }}
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label" style={{ top: "10px" }}>
                State
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="us-states-choices"
                name="state"
                value={value}
                data={value}
                label="state"
                color="secondary"
                placeholder="State"
                style={{ marginTop: "8px", marginRight: "5px", width: "100px" }}
                onChange={handleChange}
                helperText={<ErrorMessage name="state" />}
              >
                {usStates.map((states) => {
                  return (
                    <MenuItem value={states.abbreviation}>
                      {states.abbreviation}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Field
              as={TextField}
              id="zipcode"
              name="zipcode"
              label="Zip Code"
              placeholder="Zip Code"
              color="secondary"
              style={{ marginTop: "8px", marginBottom: "5px", width: "100px" }}
              helperText={<ErrorMessage name="zipcode" />}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
}
