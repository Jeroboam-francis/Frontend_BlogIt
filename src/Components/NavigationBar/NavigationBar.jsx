import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import useUserStore from "../../store/userStore";

const NavigationBar = () => {
  const user = useUserStore((state) => state.user);
  const removeUserinformation = useUserStore(
    (state) => state.removeUserinformation
  );

  function handleLogout() {
    removeUserinformation();
  }

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
      <div>
        <Logo />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {!user ? (
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
                }}
              />
            </li>
          </ol>
        ) : (
          <>
            <span style={{ marginRight: "16px" }}>
              Welcome, {user.userName || "User"}
            </span>
            <nav style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <NavigationLink to="/" label="Home" />
              <NavigationLink to="/article" label="Articles" />
              <NavigationLink to="/blogs" label="Blog Listing" />
              <NavigationLink to="/myblogs" label="My Blogs" />
              <NavigationLink to="/profile" label="My Profile" />
              <NavigationLink to="/write" label="Write" />
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

function NavigationLink({ to, label, style }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "#1976d2" : "inherit",
        fontWeight: isActive ? "bold" : "normal",
        ...style,
      })}
    >
      {label}
    </NavLink>
  );
}

export default NavigationBar;
