import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Pagination from 'themes/overrides/Pagination';
// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project import
import Dot from 'components/@extended/Dot';
import { getUsers } from 'networking/NetworkCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader';


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
    label: 'Email'
  },
  {
    id: 'phonenumber',
    align: 'left',
    disablePadding: true,
    label: 'Phone Number'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function ManagerTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          // sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ManagerTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

// const OrderStatus = ({ status }) => {
//   let color;
//   let title;

//   switch (status) {
//     case "Pending":
//       color = 'warning';
//       title = 'Pending';
//       break;
//     case "Completed":
//       color = 'success';
//       title = 'Completed';
//       break;
//     case "Picked":
//       color = 'success';
//       title = 'Picked';
//       break;
//     default:
//       color = 'primary';
//       title = 'None';
//   }

//   return (
//     <Stack direction="row" spacing={1} alignItems="center" justifyContent="end">
//       <Dot color={color} />
//       <Typography>{title}</Typography>
//     </Stack>
//   );
// };

// OrderStatus.propTypes = {
//   status: PropTypes.number
// };

// ==============================|| ORDER TABLE ||============================== //

export default function ManagerTable() {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getUsers("TRAININGMANAGER", currentPage);
      if (res.success) {
        setUsersData(res.data);
        // toast.success(res.msg);
        setTotalNumberOfPages(res.totalNumberOfPages);
      } else { toast.error(res.message) }
      setLoading(false);
    }
    getData();
  }, [currentPage]);

  return (
    <>
      <ToastContainer />
      {loading ? <Loader /> : <>
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
              <ManagerTableHead />
              {usersData.length ? <TableBody>
                {usersData.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      tabIndex={-1}
                      key={row.trackingNo}
                    >
                      <TableCell align="left">{row.user.user_name}</TableCell>
                      <TableCell align="left">{row.user.email}</TableCell>
                      <TableCell align="left">{row.user.phone_number}</TableCell>  
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
            {usersData.length > 0 && <Pagination count={totalNumberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
          </TableContainer>
        </Box>
      </>}

    </>
  );
}
