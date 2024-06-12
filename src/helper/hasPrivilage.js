import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../states/AuthContext';

const HasPrivilege = (requiredPrivilege) => {
    const { profileData } = useContext(AuthContext);
    const [hasPrivilege, setHasPrivilege] = useState(false);

    useEffect(() => {
        if (profileData.privileges.includes(requiredPrivilege)) {
            setHasPrivilege(true);
        } else {
            setHasPrivilege(false);
        }
    }, [profileData, requiredPrivilege]);

    return hasPrivilege;
};

export default HasPrivilege;

