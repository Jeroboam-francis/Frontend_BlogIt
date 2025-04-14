import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import Logo from "../Logo/Logo";

function NavigationBar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#f5f5f5",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e0e0e0",
        zIndex: 1000,
      }}
    >
      {/* Logo and Name */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "#3f51b5" }}
        >
          <Logo />
        </Typography>
      </div>

      {/* Navigation Links */}
      <ol
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
          display: "flex",
        }}
      >
        <li style={{ marginRight: "16px" }}>
          <NavigationLink to="/" label="Home" />
        </li>
        <li style={{ marginRight: "16px" }}>
          <NavigationLink
            to="/login"
            label="Log In"
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
          />
        </li>
        <li>
          <NavigationLink
            to="/signup"
            label="Sign Up"
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          />
        </li>
      </ol>
    </div>
  );
}

export default NavigationBar;

function NavigationLink({ to, label, style }) {
  return (
    <div>
      <NavLink
        to={to}
        style={{
          textDecoration: "none",
          color: "inherit",
          ...style,
        }}
        activeStyle={{
          fontWeight: "bold",
          color: "#1976d2",
        }}
      >
        {label}
      </NavLink>
    </div>
  );
}
