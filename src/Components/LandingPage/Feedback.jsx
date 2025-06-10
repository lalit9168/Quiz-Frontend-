import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../Layout/Navbar";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

const Feedback = () => {
  const form = useRef();
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_b20b3tk",     // Replace with your EmailJS service ID
        "template_9ce9qog",    // Replace with your EmailJS template ID
        form.current,
        "KDOP8W9aCiO1Omj2E"    // Replace with your EmailJS public key
      )
      .then(() => {
        setOpen(true);
        form.current.reset();
      })
      .catch(() => {
        setErrorOpen(true);
      });
  };

  return (
    <>
      <Navbar />
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
                We value your Feedback 💬
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                mb={3}
                sx={{ textAlign: "center" }}
              >
                Share your thoughts with us. Your input helps improve our app!
              </Typography>

              <Box component="form" ref={form} onSubmit={sendEmail}>
                <TextField
                  label="Your Email"
                  name="user_email"
                  type="email"
                  fullWidth
                  required
                  sx={styles.input}
                />
                <TextField
                  label="Your Feedback"
                  name="message"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  sx={styles.input}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={styles.submitBtn}
                >
                  📩 Submit Feedback
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Container>

        {/* Snackbars */}
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
            Feedback sent successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)}>
          <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: "100%" }}>
            Failed to send feedback. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </>
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
};

export default Feedback;
