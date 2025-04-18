import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import Footer from "../../Components/Footer/Footer";

function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const colors = {
    primary: "#8B5CF6",
    secondary: "#4CAF50",
    text: "#333333",
    background: "#E8F5E9",
    heroBackground: "#2E7D32",
    accent: "#81C784",
  };

  return (
    <Box
      sx={{
        bgcolor: colors.background,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: colors.heroBackground,
          py: 10,
          position: "relative",
          overflow: "hidden",
          backgroundImage: `linear-gradient(135deg, ${colors.heroBackground} 0%, ${colors.accent} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                Share your story with the world
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  mb: 4,
                  opacity: 0.9,
                  fontSize: "1.1rem",
                }}
              >
                Join a community of writers and readers who are passionate about
                ideas, knowledge sharing, and storytelling.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: colors.secondary,
                    color: "white",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#388E3C",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Start Writing
                </Button>
                <Button
                  component={Link}
                  to="/explore"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Explore Stories
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "relative",
                  height: "300px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    right: "-5%",
                    top: "-10%",
                    width: "90%",
                    height: "100%",
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    transform: "rotate(-2deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    right: "5%",
                    top: "15%",
                    width: "90%",
                    height: "100%",
                    bgcolor: "rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    transform: "rotate(3deg)",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 6,
            fontWeight: "bold",
            color: colors.text,
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "4px",
              bgcolor: colors.secondary,
              mx: "auto",
              mt: 2,
              borderRadius: 2,
            },
          }}
        >
          Why Choose BlogIt
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: 6,
            color: colors.text,
            opacity: 0.7,
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          Everything you need to create, publish, and grow your blog
        </Typography>

        <Grid container spacing={6}>
          {[
            {
              icon: <EditIcon sx={{ fontSize: 40, color: colors.secondary }} />,
              title: "Easy to Use",
              description:
                "Intuitive editor that lets you focus on your content without technical distractions",
            },
            {
              icon: (
                <MenuBookIcon sx={{ fontSize: 40, color: colors.secondary }} />
              ),
              title: "Beautiful Presentation",
              description:
                "Your content displayed in a clean, reader-friendly format that puts your writing first",
            },
            {
              icon: (
                <FolderIcon sx={{ fontSize: 40, color: colors.secondary }} />
              ),
              title: "Organize Your Work",
              description:
                "Keep track of all your published content in one organized dashboard",
            },
            {
              icon: (
                <PeopleIcon sx={{ fontSize: 40, color: colors.secondary }} />
              ),
              title: "Connect with Readers",
              description:
                "Build your audience and connect with readers who appreciate your perspective",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  width: "100%",
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  bgcolor: "white",
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 8px 24px rgba(76, 175, 80, 0.2)`,
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(76, 175, 80, 0.1)",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, fontWeight: "bold", color: colors.text }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: colors.text, opacity: 0.7 }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: colors.accent, py: 8, mt: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Ready to start your blogging journey?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 4,
              color: "white",
              opacity: 0.9,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Join thousands of writers who are already sharing their stories with
            the world.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: colors.secondary,
                px: 6,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default LandingPage;
