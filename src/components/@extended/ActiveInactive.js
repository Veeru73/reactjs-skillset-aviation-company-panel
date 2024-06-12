import React from 'react';
import { Button } from '@mui/material';

const ActiveInactive = ({ id, isActive, handleButtonClick }) => {
    const handleClick = () => {
        handleButtonClick(id, !isActive); 
    };

    return (
        <div>
            <Button
                type="button"
                variant="contained"
                color={isActive ? 'success' : 'error'}
                size="small"
                onClick={handleClick}
                sx={{ width: '100%' }}
            >
                {isActive ? 'Active' : 'Inactive'}
            </Button>
        </div>
    );
}

export default ActiveInactive;
