import React, { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

const CustomFileUpload = ({
  id,
  type,
  borderStyle = "1px dashed #a1a1a1",
  placeholder = "Upload File",
  fileCallback,
  file,
}) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (type === "products" || type==="bg_designs") {
        const index = `${id}`.substring(`${id}`.lastIndexOf("_") + 1);
        fileCallback(file, index);
      } else {
        fileCallback(file, id);
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        border: borderStyle,
        marginBottom: "1rem",
        width: "100%",
        height: "120px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        sx={{ display: "none" }}
        id={id}
      />
      <label htmlFor={id}>
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              objectFit: "contain",
            }}
          />
        ) : (
          <Typography variant="body1" component="span">
            {placeholder}
          </Typography>
        )}
      </label>
    </Box>
  );
};

export default CustomFileUpload;
