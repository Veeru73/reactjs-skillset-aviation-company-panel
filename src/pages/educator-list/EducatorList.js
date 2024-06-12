// project import
import MainCard from 'components/MainCard';
import EducatorTable from './EducatorTable';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUsers } from 'networking/NetworkCall';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader';

// ==============================|| SAMPLE PAGE ||============================== //

const EducatorList = () => {

    const [educators, setEducators] = useState([]);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        setLoading(true);
        const res = await getUsers("EDUCATOR", currentPage);
        if (res.success) {
            setEducators(res.data);
            setTotalNumberOfPages(res.totalNumberOfPages);
            setLoading(false);
        }
        setLoading(false);
    };


    useEffect(() => { getData() }, [currentPage]);

    return (
        <>
            <ToastContainer />
            {loading ? <Loader /> : <Box style={{
                position: 'relative'
            }}>
                <style jsx>{`
            .ArtistModal {
                position: absolute;
                right: 0;
                top: -5vw;
            }
        `}</style>

                {/* Pass refresh state and setter function to AddArtist component */}
                <MainCard>
                    <EducatorTable educators={educators} totalNumberOfPages={totalNumberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </MainCard>
            </Box>
            }
        </>
    )

};

export default EducatorList;
