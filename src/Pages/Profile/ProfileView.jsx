import { Box, Typography, Button, Avatar, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../utilis/apiUrl";

function ProfileView() {
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/users/profile`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            src={user?.profilePicture || "/default-avatar.png"}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h4">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="subtitle1">@{user?.userName}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Typography>Email: {user?.emailAddress}</Typography>
          {user?.secondaryEmail && (
            <Typography>Secondary Email: {user.secondaryEmail}</Typography>
          )}
          {user?.phone && <Typography>Phone: {user.phone}</Typography>}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          {user?.occupation && (
            <Typography>Occupation: {user.occupation}</Typography>
          )}
          {user?.bio && <Typography>Bio: {user.bio}</Typography>}
          {user?.statusText && (
            <Typography>Status: {user.statusText}</Typography>
          )}
        </Box>

        <Button variant="contained" onClick={() => navigate("/profile/edit")}>
          Edit Profile
        </Button>
      </Paper>
    </Box>
  );
}

export default ProfileView;
