import React, { useState, useEffect } from "react";
import MainCard from "components/MainCard";
import {
  Button, Grid, Snackbar, Alert, CircularProgress,
  InputLabel,
  OutlinedInput,
  Stack,
  Box,
  TextField,
  MenuItem,
  Checkbox,
  Select,
  ListItemText,
} from "@mui/material";
import { addUser, getPrivileges } from "networking/NetworkCall";

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [privileges, setPrivileges] = useState([]);
  const [selectedPrivilegeName, setSelectedPrivilegeName] = useState([]);
  const [snackBarState, setSnackBarState] = useState({
    show: false,
    msg: "",
    severity: "success",
  });
  const roles = [
    {
      value: 'STUDENT',
      label: 'STUDENT',
    },
    {
      value: 'TRAININGMANAGER',
      label: 'TRAINING MANAGER',
    },
    {
      value: 'EDUCATOR',
      label: 'EDUCATOR',
    }
  ];

  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    userRole: "",
    phoneNumber: "",
    privilegeIds: [],
  });

  const privilegeData = async () => {
    const res = await getPrivileges();
    if (res.success) {
      setPrivileges(res.data);
    }
  }


  const handleInputChange = (e, field) => {
    const data = { ...formData };

    data[`${field}`] = e.target.value;

    setFormData(data);
  };

  useEffect(() => {
    privilegeData();
  }, []);

  // handle select privilages multiselect 
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Map selected privilege names to their corresponding IDs
    const selectedIds = value.map(selectedName =>
      privileges.find(privilege => privilege.privilege_name === selectedName).id
    );

    setSelectedPrivilegeName(value);

    // Update formData with selected privilege IDs
    setFormData(prevState => ({
      ...prevState,
      privilegeIds: selectedIds
    }));
  };



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarState({ ...snackBarState, show: false });
  };

  const showSnackBar = (msg, severity = "error") => {
    setSnackBarState({
      show: true,
      msg,
      severity: severity,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();


    if (formData.email == "" || formData.phoneNumber == "" || formData.userName == "" || formData.userRole == "" || formData.privilegeIds.length == 0) {
      showSnackBar("All fields required");
      return;
    }

    if (!isValidEmail(formData.email)) {
      showSnackBar("Invalid email format");
      return;
    }

    setLoading(true);

    const res = await addUser(formData);

    if (res.success) {
      showSnackBar(res.message, "success");
    } else {
      showSnackBar(res.message);
    }

    setLoading(false);
  };

  return (
    <MainCard>
      <Snackbar
        open={snackBarState.show}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarState.severity}
          sx={{ width: "100%" }}
        >
          {snackBarState.msg}
        </Alert>
      </Snackbar>
      <Box style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="event-name">User Name</InputLabel>
                  <OutlinedInput
                    id="event-name"
                    type="text"
                    value={formData.userName}
                    name="userName"
                    placeholder="User name"
                    fullWidth
                    required
                    onChange={(e) => handleInputChange(e, "userName")}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-field">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-field"
                    type="email"
                    required
                    value={formData.email}
                    name="email"
                    placeholder="Enter Email address"
                    fullWidth
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address">Phone No</InputLabel>
                  <OutlinedInput
                    id="number"
                    type="text"
                    value={formData.phoneNumber}
                    name="number"
                    placeholder="Enter phone no"
                    fullWidth
                    onChange={(e) => handleInputChange(e, "phoneNumber")}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address">Role</InputLabel>
                  <TextField
                    id="outlined-select-currency"
                    select
                    // defaultValue="EDUCATOR"
                    helperText="Please select your role"
                    onChange={(e) => handleInputChange(e, "userRole")}
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel id="demo-multiple-checkbox-label">Privillage</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedPrivilegeName}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {privileges.map((e, i) => (
                      <MenuItem key={i} value={e.privilege_name} >
                        <Checkbox checked={selectedPrivilegeName.indexOf(e.privilege_name) > -1} />
                        <ListItemText primary={e.privilege_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        spacing={2}
        style={{
          justifyContent: "Start",
        }}
      >
        <Grid item xs={2}>
          {loading && <CircularProgress />}{" "}
          {!loading && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginTop: "15px",
              }}
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default AddUser;

