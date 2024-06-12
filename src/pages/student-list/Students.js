import MainCard from 'components/MainCard';
import StudentTable from './StudentTable';
import Swal from 'sweetalert2';
import MainLayout from 'layout/MainLayout/index';
// ==============================|| SAMPLE PAGE ||============================== //
// const assignLicenseHandler = (student_id) => {
//   console.log("this is id-------------", student_id);
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!"
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "Deleted!",
//         text: "Your file has been deleted.",
//         icon: "success"
//       });
//     }
//   });
// }

const Students = () => (
  <>
    {/* <MainLayout> */}
    <MainCard>
      <StudentTable />
    </MainCard>
    {/* </MainLayout> */}
  </>
);

export default Students;
