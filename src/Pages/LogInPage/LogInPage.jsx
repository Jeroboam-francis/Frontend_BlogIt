import Header from "../../Components/Header/Header";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../utilis/apiUrl";

import { useState } from "react";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const setUserInformation = useUserStore((state) => state.setUserInformation);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async () => {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        { identifier, password },
        { withCredentials: true }
      );

      return response.data;
    },
    onSuccess: (data) => {
      setUserInformation(data);
      navigate("/profile", { replace: true });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response.data.message;
        setFormError(serverMessage);
      } else {
        setFormError("Something went wrong");
      }
    },
  });

  function handleSubmit(e) {
    setFormError(null);
    e.preventDefault();
    mutate();
    console.log(identifier, password);
  }

  return (
    <Grid container component="section" justifyContent="center">
      <Header />
      <Grid
        sx={{
          gridColumn: { xs: "span 12", md: "span 7", lg: "span 5" },
          mt: 8,
        }}
      >
        <Paper component="form" sx={{ padding: 2 }} onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            textTransform="capitalize"
          >
            Log into your account
          </Typography>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <TextField
            type="text"
            label="Username or email address"
            placeholder="Your username or email address"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="Your password"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login "
            )}
          </Button>
          <Divider sx={{ my: 3 }}>or</Divider>
          <Typography variant="body1">
            Dont have an account?
            <Button component={Link} to="/register">
              Sign Up.
            </Button>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
