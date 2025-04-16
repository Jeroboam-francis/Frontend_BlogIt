import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import apiUrl from "../../utilis/apiUrl";

function MyBlogsPage() {
  const { blogId } = useParams();
  const [FetchError, setFetchError] = useState(null);
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["fetch-blog"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/getBlog/${blogId}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });
  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response.data.message;
        setFetchError(serverMessage);
      } else {
        setFetchError("Something went wrong");
      }
    }
  }, [isError, error]);
  if (FetchError) {
    return (
      <Box
        mt={20}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="h4">{FetchError}</Typography>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box
        mt={20}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CircularProgress />
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box mt={8}>
      <Grid container justifyContent={"center"}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Typography variant="h4">{data && data.title}</Typography>
          <Typography>{data && data.description}</Typography>
          <ReactMarkdown>{data && data.content}</ReactMarkdown>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyBlogsPage;
