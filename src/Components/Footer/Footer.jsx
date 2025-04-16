import { Button, Container, Typography, Box, Grid } from "@mui/material";
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              StoryShare
            </Typography>
            <Typography variant="body2">
              A platform for writers and readers to connect and share ideas.
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              Navigation
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0 }}>
              {["Home", "Articles", "Blogs", "Write"].map((item) => (
                <li key={item}>
                  <Typography
                    component="a"
                    href={`/${item.toLowerCase()}`}
                    sx={{
                      color: "#fff",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item}
                  </Typography>
                </li>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0 }}>
              {["Terms", "Privacy", "Cookies"].map((item) => (
                <li key={item}>
                  <Typography
                    component="a"
                    href={`/${item.toLowerCase()}`}
                    sx={{
                      color: "#fff",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item}
                  </Typography>
                </li>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Subscribe to our newsletter
            </Typography>
            <Box component="form" sx={{ display: "flex", gap: 1 }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flexGrow: 1,
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "none",
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{ whiteSpace: "nowrap" }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} StoryShare. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
