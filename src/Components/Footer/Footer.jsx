import {
  Box,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack,
  Container,
  Grid,
  useTheme,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? theme.palette.grey[900] : "#2C2C2C",
        py: 4,
        px: 2,
        mt: "auto",
        borderTop: `2px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              BlogIt
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sharing knowledge, ideas, and stories from around the world.
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/blogs" color="inherit" underline="hover">
                Blogs
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                About
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link href="/privacy-policy" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" color="inherit" underline="hover">
                Terms
              </Link>
              <Link href="/cookies" color="inherit" underline="hover">
                Cookies
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                aria-label="Facebook"
                href="https://facebook.com"
                target="_blank"
                color="inherit"
              >
                <Facebook />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                href="https://twitter.com"
                target="_blank"
                color="inherit"
              >
                <Twitter />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="https://instagram.com"
                target="_blank"
                color="inherit"
              >
                <Instagram />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                href="https://linkedin.com"
                target="_blank"
                color="inherit"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                aria-label="GitHub"
                href="https://github.com"
                target="_blank"
                color="inherit"
              >
                <GitHub />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} BlogIt. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: { xs: 1, sm: 0 } }}
          >
            Made with ❤️ by Jeroboam
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
