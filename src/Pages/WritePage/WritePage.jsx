import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../utilis/apiUrl";

function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: async () => {
      const response = await axios.post(
        `${apiUrl}/auth/CreateBlogs`,
        {
          title,
          description,
          content,
        },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      navigate(`/myblogs/${data.newBlog.id}`);
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

  function handleCreateBlog(e) {
    e.preventDefault();
    setFormError(null);
    console.log({ title, description, content });

    if (!title || !description || !content) {
      setFormError("All fields are required");
      return;
    }
    mutate();
  }

  return (
    <Box component="section" mt={2}>
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
      >
        New Blog
      </Typography>

      <Grid container component="div" justifyContent="center">
        <Grid item xs={11} md={8}>
          <Paper
            component="form"
            sx={{ padding: 2 }}
            onSubmit={handleCreateBlog}
          >
            {formError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {formError}
              </Alert>
            )}
            <TextField
              type="text"
              placeholder="Blog Title"
              fullWidth
              sx={{ mb: 2 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              type="text"
              placeholder="Blog Description"
              fullWidth
              sx={{ mb: 2 }}
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              type="text"
              placeholder="Write your Blog here (markdown is supported)"
              fullWidth
              sx={{ mb: 2 }}
              multiline
              minRows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Write;
