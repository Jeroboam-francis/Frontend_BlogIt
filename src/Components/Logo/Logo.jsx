// Logo.jsx
import { FaBookReader } from "react-icons/fa";

const Logo = () => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: "bold",
      fontSize: "1.25rem",
      color: "#3f51b5",
    }}
  >
    <FaBookReader />
    BlogIt
  </span>
);

export default Logo;
