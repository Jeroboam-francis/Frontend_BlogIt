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
        backgroundColor: "#f8f9fa",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <div>
        <Logo />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {!user ? (
          <ol
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <li>
              <NavigationLink
                to="/"
                label="Home"
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  ":hover": {
                    backgroundColor: "#e9ecef",
                  },
                }}
              />
            </li>
            <li>
              <NavigationLink
                to="/login"
                label="Log In"
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  ":hover": {
                    backgroundColor: "#3e8e41",
                  },
                }}
              />
            </li>
            <li>
              <NavigationLink
                to="/signup"
                label="Sign Up"
                style={{
                  backgroundColor: "#2196f3",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  ":hover": {
                    backgroundColor: "#0b7dda",
                  },
                }}
              />
            </li>
          </ol>
        ) : (
          <>
            <span
              style={{
                marginRight: "8px",
                fontWeight: 500,
                color: "#333",
                fontSize: "16px",
              }}
            >
              Welcome, {user.userName || "User"}
            </span>
            <nav
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <NavigationLink
                to="/profile"
                label="Profile"
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  ":hover": {
                    backgroundColor: "#e9ecef",
                  },
                }}
              />
              <NavigationLink
                to="/write"
                label="Write"
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  ":hover": {
                    backgroundColor: "#e9ecef",
                  },
                }}
              />
              <NavigationLink
                to="/my-blogs"
                label="My Blogs"
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  ":hover": {
                    backgroundColor: "#e9ecef",
                  },
                }}
              />
              <NavigationLink
                to="/blogs"
                label="Blog Listing"
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  ":hover": {
                    backgroundColor: "#e9ecef",
                  },
                }}
              />

              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "background-color 0.2s ease",
                  ":hover": {
                    backgroundColor: "#d32f2f",
                  },
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
        color: isActive ? "#1976d2" : "#333",
        fontWeight: isActive ? "600" : "500",
        fontSize: "16px",
        transition: "all 0.2s ease",
        ...style,
      })}
    >
      {label}
    </NavLink>
  );
}

export default NavigationBar;
