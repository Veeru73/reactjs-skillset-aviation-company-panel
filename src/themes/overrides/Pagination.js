import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationTable = ({ count, currentPage, setCurrentPage, }) => {

    const handlePageChange = (event, value) => {
        // Update the current page in the parent component
        setCurrentPage(value);
    };

    return (
        <>
            <Stack spacing={2} style={{
                justifyContent: 'center',
                alignItems: 'end',
                marginTop: '20px'
            }}>
                <Pagination
                    count={count}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                />
            </Stack>
        </>
    )
}

export default PaginationTable
