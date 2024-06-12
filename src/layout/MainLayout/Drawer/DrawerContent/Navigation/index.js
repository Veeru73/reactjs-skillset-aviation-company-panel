import { Box, Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { DashboardOutlined, UsergroupAddOutlined, SolutionOutlined, FileProtectOutlined, FileSearchOutlined, IdcardOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from 'states/AuthContext';
// ==============================|| MENU ITEMS ||==============================
const Navigation = () => {
  const { profileData } = useContext(AuthContext);
  //get user assigned privilages;
  const privileges = profileData?.privileges || [];

  const navGroups = menuItem(privileges).items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
