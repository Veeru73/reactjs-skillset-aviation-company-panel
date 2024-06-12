import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const ErrorPage = () => {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h1" color="primary" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                    Oops! Page not found.
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    The page you are looking for might be in another castle.
                </Typography>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Go Home
                </Button>
            </Box>
        </Container>
    );
};

export default ErrorPage;
