import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
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
        minHeight="50vh"
      >
        <CircularProgress />
        Its loading please wait....
      </Box>
    );
  }

  if (isError) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Explore Blogs
      </Typography>
      <Grid container spacing={4}>
        {data.map((blog) => (
          <Grid item xs={12} md={4} key={blog.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {blog.description}
                </Typography>
                <Typography variant="body1" color="text.primary" paragraph>
                  {blog.content}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  By {blog.author.userName} on{" "}
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BlogListingPage;
