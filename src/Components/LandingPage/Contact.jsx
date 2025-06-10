import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, education, message } = formData;
    const mailtoLink = `mailto:lalitchaudhari003@gmail.com?subject=${encodeURIComponent(
      `Quiz App Contact from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nEducation: ${education}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink.replaceAll("\n", "");
  };

  return (
    <Box sx={styles.root}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={6} sx={styles.card}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              Contact Us
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              mb={3}
              sx={{ textAlign: "center" }}
            >
              Have questions, suggestions, or need help? Fill out the form —
              we’ll get back to you shortly!
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                sx={styles.input}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                sx={styles.input}
              />
              <TextField
                label="Education"
                name="education"
                fullWidth
                value={formData.education}
                onChange={handleChange}
                sx={styles.input}
              />
              <TextField
                label="Tell us why you’re reaching out"
                name="message"
                multiline
                rows={4}
                fullWidth
                required
                value={formData.message}
                onChange={handleChange}
                sx={styles.input}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={styles.submitBtn}
              >
                📧 Send Message
              </Button>
            </Box>

            <Stack direction="row" spacing={3} justifyContent="center" mt={4}>
              <IconButton
                href="tel:+919168018581"
                sx={styles.iconBtn}
                title="Call us"
              >
                <PhoneIcon fontSize="medium" />
              </IconButton>
              <IconButton
                href="mailto:lalitchaudhari003@gmail.com"
                sx={styles.iconBtn}
                title="Email us"
              >
                <EmailIcon fontSize="medium" />
              </IconButton>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

const styles = {
  root: {
    background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 8,
    px: 2,
  },
  card: {
    p: 4,
    borderRadius: 3,
    bgcolor: "#ffffff",
  },
  input: {
    mb: 2,
  },
  submitBtn: {
    mt: 1,
    background: "linear-gradient(to right, #00feba, #5b86e5)",
    fontWeight: "bold",
    ":hover": {
      background: "linear-gradient(to right, #5b86e5, #00feba)",
    },
  },
  iconBtn: {
    backgroundColor: "#e5e7eb",
    "&:hover": { bgcolor: "#d1d5db" },
  },
};

export default Contact;
