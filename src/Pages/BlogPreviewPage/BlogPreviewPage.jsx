import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import apiUrl from "../../utilis/apiUrl";

function BlogPreviewPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [fetchError, setFetchError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["fetch-blog", blogId],
    queryFn: async () => {
      if (!blogId) {
        throw new Error("Invalid blog ID");
      }

      const response = await axios.get(`${apiUrl}/getBlog/${blogId}`, {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: !!blogId,
    retry: false,
    onSuccess: (data) => {
      setEditedBlog({
        title: data.title,
        description: data.description,
        content: data.content,
      });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: async (updatedBlog) => {
      const response = await axios.put(
        `${apiUrl}/blogs/${blogId}`,
        updatedBlog,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-blog", blogId]);
      setIsEditing(false);
      setNotification({
        open: true,
        message: "Blog updated successfully!",
        severity: "success",
      });
    },
    onError: (err) => {
      let errorMessage = "Failed to update blog";
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }
      setNotification({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    },
  });

  useEffect(() => {
    if (!blogId) {
      setFetchError("Invalid blog ID.");
    } else {
      setFetchError(null);
    }
  }, [blogId]);

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data.message;
        setFetchError(serverMessage);
      } else {
        setFetchError(error.message || "Something went wrong");
      }
    }
  }, [isError, error]);

  const handleGoBack = () => {
    navigate("/my-blogs");
  };

  const handleToggleEdit = () => {
    if (isEditing && hasChanges()) {
      if (window.confirm("You have unsaved changes. Discard changes?")) {
        resetForm();
      } else {
        return;
      }
    }

    if (!isEditing && data) {
      setEditedBlog({
        title: data.title,
        description: data.description,
        content: data.content,
      });
    }

    setIsEditing(!isEditing);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${apiUrl}/blogs/${blogId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-my-blogs"]);
      navigate("/my-blogs");
      setNotification({
        open: true,
        message: "Blog deleted successfully!",
        severity: "success",
      });
    },
    onError: (err) => {
      let errorMessage = "Failed to delete blog";
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }
      setNotification({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogMutation.mutate();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateBlogMutation.mutate(editedBlog);
  };

  const resetForm = () => {
    if (data) {
      setEditedBlog({
        title: data.title,
        description: data.description,
        content: data.content,
      });
    }
    setIsEditing(false);
  };

  const hasChanges = () => {
    if (!data) return false;
    return (
      editedBlog.title !== data.title ||
      editedBlog.description !== data.description ||
      editedBlog.content !== data.content
    );
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  if (fetchError) {
    return (
      <Container maxWidth="md">
        <Box
          mt={10}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={8}
        >
          <Typography variant="h4" color="error" gutterBottom>
            {fetchError}
          </Typography>
          <Typography variant="body1" mb={4}>
            Unable to load the requested blog post.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Go to My Blogs
          </Button>
        </Box>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box
          mt={10}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={8}
        >
          <CircularProgress size={60} />
          <Typography variant="h5" mt={2}>
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box mt={8} mb={4}>
        <Paper elevation={2} sx={{ p: 4 }}>
          {isEditing ? (
            <Box component="form">
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={editedBlog.title}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={editedBlog.description}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Content (Markdown supported)"
                name="content"
                value={editedBlog.content}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={15}
              />

              <Box mt={2} mb={2}>
                <Typography variant="subtitle2" color="text.secondary">
                  Preview:
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                  <Typography variant="h5">{editedBlog.title}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {editedBlog.description}
                  </Typography>
                  <ReactMarkdown>{editedBlog.content || ""}</ReactMarkdown>
                </Box>
              </Box>

              <Box mt={4} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={updateBlogMutation.isLoading || !hasChanges()}
                >
                  {updateBlogMutation.isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="outlined" onClick={handleToggleEdit}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="h3" gutterBottom>
                {data?.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" paragraph>
                {data?.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box mt={2}>
                <ReactMarkdown>{data?.content || ""}</ReactMarkdown>
              </Box>
              <Box mt={6} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleToggleEdit}
                >
                  Edit Blog
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                  disabled={deleteBlogMutation.isLoading}
                >
                  {deleteBlogMutation.isLoading ? "Deleting..." : "Delete Blog"}
                </Button>
                <Button variant="outlined" onClick={handleGoBack}>
                  Back to My Blogs
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default BlogPreviewPage;
