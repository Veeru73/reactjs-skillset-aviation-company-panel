import { useState, useEffect } from 'react';
import Pagination from 'themes/overrides/Pagination';
import { assignLicenseToStudent, getUsers } from "../../networking/NetworkCall"
import { Box, Table, TableBody, TableCell, TableContainer, Button, TableHead, TableRow, Typography } from '@mui/material';
import Loader from 'components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
// ==============================|| EVENT TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'userName',
        align: 'left',
        disablePadding: false,
        label: 'User Name'
    },
    {
        id: 'emailaddress',
        align: 'left',
        disablePadding: true,
        label: 'Email Address'
    },
    {
        id: 'phone',
        align: 'left',
        disablePadding: false,
        label: 'Phone No'
    },
    {
        id: 'Has license',
        align: 'left',
        disablePadding: false,
        label: 'Has license'
    },
    // {
    //     id: 'activeInactive',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Previllage'
    // },
];

// ==============================|| EVENT TABLE - HEADER ||============================== //

function StudentTableHead() {
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

export default function StudentTable() {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
    const [studentData, setStudentData] = useState([]);

    const getData = async () => {
        setLoading(true);
        const res = await getUsers("STUDENT", currentPage);
        if (res.success) {
            setStudentData(res.data);
            // toast.success(res.msg);
            setTotalNumberOfPages(res.totalNumberOfPages);
        } else { toast.error(res.message) }
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [currentPage]);


    console.log("this is student data-----------------", studentData)


    const assignLicenseHandler = (studentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "confirm!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await assignLicenseToStudent(studentId);
                const studentDataDeepCopy = JSON.stringify(studentData);
                if (res.success) {
                    Swal.fire({
                        title: "Assigned!",
                        text: res.message,
                        icon: "success"
                    });

                    const updatableStudentData = studentData.map((e) =>
                        e.user.id === studentId ? { ...e, user: { ...e.user, student_has_license: true } } : e
                    );

                    setStudentData(updatableStudentData);

                } else {
                    setStudentData(JSON.parse(studentDataDeepCopy))
                    Swal.fire({
                        text: res.message,
                        icon: "warning"
                    });
                }
            }
        });
    }


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
                        <StudentTableHead />
                        {studentData.length ? <TableBody>
                            {studentData.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        <TableCell align="left">{row.user.user_name}</TableCell>
                                        <TableCell align="left">{row.user.email}</TableCell>
                                        <TableCell align="left">{row.user.phone_number}</TableCell>
                                        <TableCell align="left">{row.user.student_has_license ? <Button variant="contained" disabled>
                                            Have lincese
                                        </Button> : <Button variant="contained" onClick={() => assignLicenseHandler(row.user.id)}>
                                            Assign license
                                        </Button>}</TableCell>
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
                    {studentData.length > 0 && <Pagination count={totalNumberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                </TableContainer>
            </Box>}
        </>

    );
}
