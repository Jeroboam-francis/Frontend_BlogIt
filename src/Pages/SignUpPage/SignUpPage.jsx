import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import Header from "../../Components/Header/Header";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async () => {
      const payload = {
        firstName,
        lastName,
        userName,
        emailAddress,
        password,
      };
      console.log("Register payload:", payload);
      const response = await axios.post(
        `http://localhost:4000/auth/register`,
        payload
      );
      return response.data;
    },


    onSuccess: () => {
      navigate("/login");
    },

    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response.data.message;
        setFormError(serverMessage);
      } else {
        setFormError("Something went wrong");
      }
    },
  });

  function handleRegister(e) {
    e.preventDefault();
    setFormError(null);

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !userName ||
      !password ||
      !confirmedPassword
    ) {
      setFormError("All fields are required");
      return;
    }

    if (password !== confirmedPassword) {
      setFormError("Passwords do not match");
      return;
    }

    mutate();
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Header />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 3,
            }}
          >
            Join our community of readers and writers
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            Share your stories, discover new perspectives, and connect with
            other passionate readers.
          </Typography>

          {formError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {formError}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleRegister}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isPending}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 1,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account "
              )}
            </Button>

            <Divider sx={{ my: 3 }}>or</Divider>

            <Typography variant="body2" color="text.secondary" align="center">
              Already have an account?{" "}
              <Link href="/login" underline="hover" sx={{ cursor: "pointer" }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUp;
