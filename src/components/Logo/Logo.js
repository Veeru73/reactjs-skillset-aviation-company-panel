// material-ui
import { useTheme } from "@mui/material/styles";
import logo from "assets/logo/logo.svg";


const Logo = () => {
  const theme = useTheme();

  return (
    <>
      <img src={logo} className='img-fluid' alt="Logo" style={{
        width:'210px'
      }}/>
    </>
  );
};

export default Logo;
