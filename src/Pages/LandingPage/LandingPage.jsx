import { Button, Container, Typography, Box, Grid } from "@mui/material";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

function LandingPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          py: 10,
          px: 2,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                Share your story with the world
              </Typography>

              <Typography
                variant="h5"
                component="p"
                color="text.secondary"
                sx={{
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                Join a community of passionate writers and readers. Publish your
                ideas, discover new perspectives, and connect with like-minded
                individuals.
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  Start Writing
                </Button>

                <Button
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  Explore Stories
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Writing inspiration"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Additional Sections (optional) */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Why join our platform?
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            {
              title: "Reach Your Audience",
              description:
                "Connect with readers who care about what you write.",
            },
            {
              title: "Simple Publishing",
              description: "Focus on writing - we handle the rest.",
            },
            {
              title: "Engage with Community",
              description: "Get feedback and build relationships.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}

export default LandingPage;
