import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import apiUrl from "../../utilis/apiUrl";

function BlogListingPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetch-blogs"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
        <Typography ml={2}> Loading, please wait...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Explore Blogs
      </Typography>

      <Grid container spacing={4}>
        {data.map((blog) => (
          <Grid item xs={12} key={blog.id || blog._id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {blog.title}
                </Typography>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  By {blog.author.userName} on{" "}
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {blog.description}
                </Typography>

                <Box sx={{ mt: 2, px: 1 }}>
                  <ReactMarkdown>{blog.content}</ReactMarkdown>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BlogListingPage;
