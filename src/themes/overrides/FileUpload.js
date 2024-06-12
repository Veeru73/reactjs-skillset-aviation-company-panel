import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

const FileUpload = ({ id, borderStyle = '1px dashed #a1a1a1', placeholder = 'Upload File', imageSize = '100px' }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        border: borderStyle,
        marginBottom: '1rem',
        width: '100%',
        height: '120px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
      <Input

        type="file"
        accept="image/*"
        onChange={handleImageChange}
        sx={{ display: 'none' }}
        id={id}
      />
      <label htmlFor={id}>
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }}
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

export default FileUpload;
