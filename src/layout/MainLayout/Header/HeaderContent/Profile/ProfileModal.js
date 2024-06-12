import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { createArtist } from "../../../../../networking/NetworkCall";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate, useLocation } from "react-router-dom"
import { Button, Grid, Typography, Modal, Box, TextField, Stack, InputLabel, OutlinedInput, FormHelperText, IconButton, InputAdornment } from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ProfileModal = ({ btnClass, getData }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [logo, setLogo] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image")) {
            setFieldValue("organization_logo", file);
            setLogo(file);
        } else {
            toast.error("Please select image type file");
            setFieldValue("organization_logo", null);
            setLogo(null);
        }
    };

    // Destructuring formik object
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            mobile: '',
            organization_name: '',
            organization_logo: null
        },

        validationSchema: Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required'),
            name: Yup.string().max(200).required('Name is Required'),
            organization_logo: Yup.string().required("Company logo is required"),
            mobile: Yup.string().required('Mobile number is required'),
            organization_name: Yup.string().required('Organization name is required')
        }),

        onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
            const data = new FormData();
            data.append("email", values.email);
            data.append("name", values.name);
            data.append("mobile", values.mobile);
            data.append("organization_name", values.organization_name);
            data.append("password", values.password)
            data.append("organization_logo", values.organization_logo)

            const res = await createArtist(data);
            if (res.success) {
                toast.success(res.msg);
                navigate("/admin/vendor-list");
            } else {
                toast.error(res.msg);
            }
        }
    });


    return (
        <>
            <ToastContainer />
            <Button fullWidth className="ProfileButton" type="button" variant="contained" size="large" onClick={handleOpen} startIcon={<UserOutlined style={{
                fontSize: '14px',
                marginRight: '8px'
            }} />} sx={{
                background: 'transparent',
                color: '#000',
                justifyContent: 'left',
                '&:hover': {
                    background: '#0000000a!important',
                },
            }}>Profile</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    overflow: 'scroll',
                    // scrollbarWidth: 'none'
                }}

            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h2" component="h2" sx={{
                        textAlign: 'center'
                    }}>
                        My Profile
                    </Typography>
                    <form onSubmit={handleSubmit}
                        noValidate

                    >
                        <div>
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                name="organization_logo"
                                style={{ display: 'none' }}
                                onChange={handleLogoChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.name && errors.name)}
                                required
                            />
                            <Box sx={{
                                display: 'grid',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px'
                            }}>

                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" component="span" className="mb-2 mt-4" sx={{
                                        background: 'transparent',
                                        color: '#000',
                                        border: '1px dashed #000',
                                        width: '100%',
                                        marginBottom: '10px',
                                        marginTop: '10px',
                                        position: 'relative',
                                        '&:hover': {
                                            background: 'transparent',
                                            color: '#1777FF',
                                            border: '1px dashed #1777FF',
                                        }
                                    }}>
                                        {logo && (
                                            <img src={URL.createObjectURL(logo)} alt="Logo" style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'contain'
                                            }} />
                                        )}
                                        {!logo && <span>Upload Logo</span>}
                                    </Button>
                                </label>
                                {touched.organization_logo && errors.organization_logo && (
                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                        {errors.organization_logo}
                                    </FormHelperText>
                                )}
                            </Box>

                            <Grid container spacing={1}>
                                <Grid item lg={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name">Name</InputLabel>
                                        <OutlinedInput
                                            id="name"
                                            type="text"
                                            value={values.name}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            fullWidth
                                            error={Boolean(touched.name && errors.name)}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="mobile">Mobile No</InputLabel>
                                        <OutlinedInput
                                            id="mobile"
                                            type="text"
                                            value={values.mobile}
                                            name="mobile"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter mobile no"
                                            fullWidth
                                            error={Boolean(touched.mobile && errors.mobile)}
                                        />
                                        {touched.mobile && errors.mobile && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.mobile}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-login">Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            id="-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="Enter password"
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="organization_name">Organization Name</InputLabel>
                                        <OutlinedInput
                                            id="organization_name"
                                            type="text"
                                            value={values.organization_name}
                                            name="organization_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter organization name"
                                            fullWidth
                                            error={Boolean(touched.organization_name && errors.organization_name)}
                                        />
                                        {touched.organization_name && errors.organization_name && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.organization_name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>

                            {/* <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting} sx={{
                                width: '100%',
                                marginTop: '15px',
                                background: '#0958d9!important'
                            }}>
                                Submit
                            </LoadingButton> */}
                        </div>

                    </form>
                </Box>
            </Modal>
        </>
    )
}
