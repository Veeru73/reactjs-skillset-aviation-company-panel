import { useState, useEffect } from 'react';
import Pagination from 'themes/overrides/Pagination';
import { getEvents,  } from "../../networking/NetworkCall"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Loader from 'components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ==============================|| EVENT TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'coursesName',
        align: 'left',
        disablePadding: false,
        label: 'Courses Name'
    },
    // {
    //     id: 'emailaddress',
    //     align: 'left',
    //     disablePadding: true,
    //     label: 'Email Address'
    // },
    // {
    //     id: 'phone',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Phone No'
    // },
    // {
    //     id: 'role',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Role'
    // },
    // {
    //     id: 'activeInactive',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Previllage'
    // },
];

// ==============================|| EVENT TABLE - HEADER ||============================== //

function CourseTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// ==============================|| EVENT TABLE ||============================== //

export default function CourseTable() {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const res = await getEvents(currentPage);
            if (res.success) {
                setEventData(res.data?.data);
                // toast.success(res.msg);
                setTotalNumberOfPages(res.data?.totalNumberOfPages);
            } else { toast.error(res.msg) }
            setLoading(false);
        }
        getData();
    }, [currentPage]);

    return (
        <>
            <ToastContainer />
            {loading ? <Loader /> : <Box>
                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        position: 'relative',
                        display: 'block',
                        maxWidth: '100%',
                        '& td, & th': { whiteSpace: 'nowrap' }
                    }}
                >
                    <Table
                        aria-labelledby="tableTitle"
                        sx={{
                            '& .MuiTableCell-root:first-of-type': {
                                pl: 2
                            },
                            '& .MuiTableCell-root:last-of-type': {
                                pr: 3
                            }
                        }}
                    >
                        <CourseTableHead />
                        {eventData.length ? <TableBody>
                            {eventData.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        <TableCell align="left">{row.name}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody> : <TableBody>
                            <TableRow tabIndex={-1}>
                                <TableCell
                                    colSpan={headCells.length}
                                    sx={{
                                        textAlign: 'center',
                                        width: '100%',
                                        borderBottom: '0px solid #000'
                                    }}
                                >
                                    <Typography variant="h2">
                                        Data Not Found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>}

                    </Table>
                    {eventData.length > 0 && <Pagination count={totalNumberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                </TableContainer>
            </Box>}
        </>

    );
}
