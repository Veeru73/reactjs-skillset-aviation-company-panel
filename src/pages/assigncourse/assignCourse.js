import React, { useState } from "react";
import MainCard from "components/MainCard";
import AssignForm from "./AssignForm";
import { Button, Grid, Snackbar, Alert, CircularProgress } from "@mui/material";
// import { createEvent } from "networking/NetworkCall";

const AssignCourse = () => {
  const [loading, setLoading] = useState(false);

  const [snackBarState, setSnackBarState] = useState({
    show: false,
    msg: "",
    severity: "success",
  });

  // const data = {
  //   name: "",
  //   address: "",
  //   date: "",
  //   time: "",
  //   event_logo: null,
  //   bg_designs: [],
  //   products: [],
  // };

  const [data, setData] = useState({
    name: "",
    address: "",
    date: "",
    time: "",
    event_logo: null,
    bg_designs: [],
    products: [],
  });

  const deepCopy = (obj) => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    // Handle File objects separately
    if (obj instanceof File) {
      return obj;
    }

    const copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }

    return copy;
  };

  const dataCallback = (fieldName, mData, operation, index) => {
    // const newData = JSON.parse(JSON.stringify(data));
    const newData = deepCopy(data);

    if (
      fieldName === "name" ||
      fieldName === "address" ||
      fieldName === "date" ||
      fieldName === "time" ||
      fieldName === "event_logo"
    ) {
      newData[fieldName] = mData;
      setData(newData);
      // data[fieldName] = mData;
    } else if (fieldName === "bg_designs" || fieldName === "products") {
      if (operation === "add") {
        newData[fieldName].push(mData);
        setData(newData);
        // data[fieldName].push(mData);
      } else if (operation === "remove") {
        newData[fieldName].splice(index, 1);
        setData(newData);
        // data[fieldName].splice(index, 1);
      } else if (operation === "update") {
        newData[fieldName][index] = mData;
        setData(newData);
        // data[fieldName][index] = mData;
      }
    }
  };

  const showSnackBar = (msg, severity = "error") => {
    setSnackBarState({
      show: true,
      msg,
      severity: severity,
    });
  };

  const onSubmitHandler = async (e) => {
    // const mData = JSON.parse(JSON.stringify(data));
    const mData = deepCopy(data);

    if (mData.event_logo === null || mData.event_logo === undefined) {
      showSnackBar("Event logo is required");
      return;
    }

    if (
      mData.name === null ||
      mData.name === undefined ||
      mData.name.length === 0
    ) {
      showSnackBar("Event name is required");
      return;
    }

    if (
      mData.address === null ||
      mData.address === undefined ||
      mData.address.length === 0
    ) {
      showSnackBar("Event address is required");
      return;
    }

    if (
      mData.date === null ||
      mData.date === undefined ||
      mData.date.length === 0
    ) {
      showSnackBar("Event date is required");
      return;
    }

    if (
      mData.time === null ||
      mData.time === undefined ||
      mData.time.length === 0
    ) {
      showSnackBar("Event time is required");
      return;
    }

    if (
      mData.bg_designs === null ||
      mData.bg_designs === undefined ||
      mData.bg_designs.length === 0
    ) {
      showSnackBar("At least one background design is required");
      return;
    }

    const isNotValidBackgroundDesign = mData.bg_designs.some(
      (val, index) => !val.file
    );

    if (isNotValidBackgroundDesign) {
      showSnackBar("All added background design must have image");
      return;
    }

    const isNotValidProductType = mData.products.some(
      (val, index) => val.product_type === ""
    );

    if (isNotValidProductType) {
      showSnackBar("All added product must have type");
      return;
    }

    const isNotValidProductImage = mData.products.some(
      (val, index) => !val.file
    );

    if (isNotValidProductImage) {
      showSnackBar("All added product must have image");
      return;
    }

    const isNotValidProductQuantity = mData.products.some(
      (val, index) => !val.quantity || parseInt(val.quantity) <= 0
    );

    if (isNotValidProductQuantity) {
      showSnackBar("All added product must have quantity greater than 0");
      return;
    }

    if (
      mData.products === null ||
      mData.products === undefined ||
      mData.products.length === 0
    ) {
      showSnackBar("At least one product is required");
      return;
    }

    setLoading(true);

    const formData = {
      name: mData.name,
      address: mData.address,
      date: mData.date,
      time: mData.time,
      event_logo: data.event_logo,
    };

    const bg_designs = [];
    const bg_designs_colors = [];
    const products = [];
    const products_properties = [];

    for (let i = 0; i < data.bg_designs.length; i++) {
      bg_designs.push(data.bg_designs[i].file);
      bg_designs_colors.push(data.bg_designs[i].colors);
    }

    for (let i = 0; i < data.products.length; i++) {
      products.push(data.products[i].file);

      const properties = { ...data.products[i] };
      delete properties.file;
      products_properties.push(properties);
    }

    formData.bg_designs = bg_designs;
    formData.bg_designs_colors = JSON.stringify(bg_designs_colors);
    formData.products = products;
    formData.products_properties = JSON.stringify(products_properties);

    // const res = await createEvent(formData);
    const res = data;

    if (res.success) {
      showSnackBar("Event has been created", "success");
    }

    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarState({ ...snackBarState, show: false });
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
      <AssignForm dataCallback={dataCallback} />
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

export default AssignCourse;
