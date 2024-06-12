import * as React from 'react';
import { useState } from "react";
import {
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Box,
  TextField,
  MenuItem,
  Checkbox,
  Select,
  ListItemText,
  Button
} from "@mui/material";

const AssignForm = ({ dataCallback }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    date: "",
    time: "",
    event_logo: null,
  });

  const handleInputChange = (e, field) => {
    const data = { ...formData };

    data[`${field}`] = e.target.value;

    setFormData(data);

    dataCallback(field, e.target.value);
  };
  const currencies = [
    {
      value: '1',
      label: 'Role01',
    },
    {
      value: '2',
      label: 'Role02',
    },
    {
      value: '3',
      label: 'Role03',
    },
    {
      value: '4',
      label: 'Role04',
    },
  ];
  const modules = [
    {
      value: '1',
      label: 'Module01',
    },
    {
      value: '2',
      label: 'Module02',
    },
    {
      value: '3',
      label: 'Module03',
    },
    {
      value: '4',
      label: 'Module04',
    },
  ];
  const course = [
    {
      value: '1',
      label: 'Course1',
    },
    {
      value: '2',
      label: 'Course2',
    },
    {
      value: '3',
      label: 'Course3',
    },
    {
      value: '4',
      label: 'Course4',
    },
  ];



  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const onSubmit = async (e) => { };

  return (
    <>
      <Box style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address">Select Student</InputLabel>
                  <TextField
                    id="outlined-select-student"
                    select
                    defaultValue="2"
                    onChange={(e) => handleInputChange(e, "role")}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address">Courses</InputLabel>
                  <TextField
                    id="outlined-select-course"
                    select
                    defaultValue="4"
                    helperText="Please select your course"
                    onChange={(e) => handleInputChange(e, "role")}
                  >
                    {course.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address">List Module</InputLabel>
                  <TextField
                    id="outlined-select-module"
                    select
                    defaultValue="5"
                    onChange={(e) => handleInputChange(e, "role")}
                  >
                    {modules.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="date-time">Start Date</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="date"
                    type="date"
                    value={formData.date}
                    name="date"
                    placeholder="Date"
                    onChange={(e) => handleInputChange(e, "date")}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="date-time">End Date</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="date"
                    type="date"
                    value={formData.date}
                    name="date"
                    placeholder="Date"
                    onChange={(e) => handleInputChange(e, "date")}
                  />
                </Stack>
              </Grid>
            </Grid>
            {/* <Grid
              container
              spacing={2}
              style={{
                justifyContent: "Start",
              }}
            >
              <Grid item xs={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                      marginTop: "15px",
                    }}
                    // onClick={onSubmitHandler}
                  >
                    Submit
                  </Button>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AssignForm;
