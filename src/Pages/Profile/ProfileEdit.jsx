import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  Avatar,
  Paper,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../utilis/apiUrl";
import { useNavigate } from "react-router-dom";

function ProfileEdit() {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const { data: user } = useQuery({
    queryKey: ["user-profile-edit"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/users/profile`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    emailAddress: user?.emailAddress || "",
    userName: user?.userName || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          formData[key] ||
          (key !== "newPassword" &&
            key !== "confirmNewPassword" &&
            key !== "currentPassword")
        ) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (profilePhoto) {
        formDataToSend.append("profilePhoto", profilePhoto);
      }

      const response = await axios.put(
        `${apiUrl}/users/update-profile`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setFormSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 2000);
    },
    onError: (error) => {
      setFormError(error.response?.data?.message || "Something went wrong");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      setFormError("New passwords do not match");
      return;
    }

    if (
      (formData.newPassword || formData.confirmNewPassword) &&
      !formData.currentPassword
    ) {
      setFormError("Current password is required to change password");
      return;
    }

    mutation.mutate();
  }

  function handleChange(e) {
    const fieldNameMapping = {
      email: "emailAddress",
      username: "userName",
    };

    const fieldName = fieldNameMapping[e.target.name] || e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.value });
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}
        {formSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {formSuccess}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              src={
                previewPhoto || user?.profilePicture || "/default-avatar.png"
              }
              sx={{ width: 80, height: 80, mr: 2 }}
            />
            <Button variant="outlined" component="label">
              Change Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </Button>
          </Box>

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Personal Information
          </Typography>

          <TextField
            label="First Name *"
            name="firstName"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name *"
            name="lastName"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email *"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
          <TextField
            label="Username *"
            name="username"
            fullWidth
            margin="normal"
            value={formData.userName}
            required
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Change Password
          </Typography>

          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <TextField
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => navigate("/profile")}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default ProfileEdit;
