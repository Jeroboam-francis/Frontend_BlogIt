import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Typography, Avatar, Grid, Card, CardContent, CardMedia } from "@mui/material";
import apiUrl from "../../utilis/apiUrl";

function ArticlePage() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetch-article", id],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs/${id}`, { withCredentials: true });
      return response.data;
    },
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const { title, content, featuredImage, author, updatedAt, moreArticles } = data;

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar src={author.profilePicture || "/placeholder-avatar.jpg"} alt={author.userName} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle1">{author.userName}</Typography>
          <Typography variant="caption" color="text.secondary">
            Last updated: {new Date(updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
      <Box
        component="img"
        src={featuredImage || "/placeholder.jpg"}
        alt={title}
        sx={{ width: "100%", borderRadius: 2, mb: 4 }}
      />
      <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
        {content}
      </Typography>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          More Articles from {author.userName}
        </Typography>
        <Grid container spacing={4}>
          {moreArticles.length > 0 ? (
            moreArticles.map((article) => (
              <Grid item xs={12} md={4} key={article.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={article.featuredImage || "/placeholder.jpg"}
                    alt={article.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{article.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.excerpt}
                    </Typography>
                    <Link to={`/article/${article.id}`}>Read More</Link>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No more articles available.</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default ArticlePage;