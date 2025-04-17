import { useState } from "react";
import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../utilis/apiUrl";

function MyProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.put(
        `${apiUrl}/users/update-profile`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setFormSuccess("Profile updated successfully!");
    },
    onError: (error) => {
      setFormError(error.response?.data?.message || "Something went wrong");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setFormError("Passwords do not match");
      return;
    }
    mutation.mutate();
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      {formError && <Alert severity="error">{formError}</Alert>}
      {formSuccess && <Alert severity="success">{formSuccess}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Current Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Update Profile
        </Button>
      </form>
    </Box>
  );
}

export default MyProfilePage;
