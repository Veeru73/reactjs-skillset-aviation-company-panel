import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Grid, Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Pagination from 'themes/overrides/Pagination';
import 'react-toastify/dist/ReactToastify.css';


// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'userName',
        align: 'left',
        disablePadding: false,
        label: 'User Name',
    },
    {
        id: 'email',
        align: 'left',
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'phonenumber',
        align: 'left',
        disablePadding: false,
        label: 'Phone Number.'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function EducatorTableHead({ order, orderBy }) {
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

EducatorTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};


// ==============================|| Vendor TABLE ||============================== //

export default function EducatorTable({ totalNumberOfPages, educators, currentPage, setCurrentPage }) {


    return (<>
        <Box>
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
                    <EducatorTableHead />
                    {educators.length ? <TableBody>
                        {educators.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    tabIndex={-1}
                                    key={index}
                                >
                                    {/* <TableCell align="left">
                                        <img src={row.organization_logo} className='img-fluid eventimg' alt="" style={{
                                            width: '100%',
                                            maxWidth: '50px',
                                            maxHeight: '50px'
                                        }} />
                                    </TableCell> */}
                                    <TableCell align="left">{row.user.user_name}</TableCell>
                                    {/* <TableCell align="left">{row.user.email}</TableCell> */}
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.user.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.user.phone_number}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody> :
                        <TableBody>
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
                        </TableBody>
                    }
                </Table>
                {educators.length > 0 && <Pagination count={totalNumberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            </TableContainer>
        </Box>
    </>
    );
}
