import NavigationBar from "../NavigationBar/NavigationBar";
import Logo from "../Logo/Logo";
import { Box } from "@mui/material";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "16px",
      }}
    >
      <NavigationBar />
    </Box>
  );
}

export default Header;
