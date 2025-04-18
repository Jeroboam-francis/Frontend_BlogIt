import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import apiUrl from "../../utilis/apiUrl";

function MyBlogsPage() {
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["fetch-my-blogs"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/my-blogs`, {
        withCredentials: true,
      });
      return response.data;
    },
    retry: false,
  });

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

  const handleCreateNewBlog = () => {
    navigate("/write");
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
            Unable to load your blogs.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewBlog}
          >
            Create New Blog
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" color="primary">
            My Blogs
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewBlog}
          >
            Create New Blog
          </Button>
        </Box>

        {data && data.length > 0 ? (
          <Grid container spacing={3}>
            {data.map((blog) => (
              <Grid item xs={12} key={blog.id}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {blog.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/myblogs/${blog.id}`}
                    >
                      View Full Article
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper elevation={1} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              You haven't created any blogs yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateNewBlog}
              sx={{ mt: 2 }}
            >
              Write Your First Blog
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default MyBlogsPage;
