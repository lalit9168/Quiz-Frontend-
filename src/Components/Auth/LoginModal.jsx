import React, { useState } from "react";
import {
  Box, Paper, TextField, Button, Typography,
  IconButton, Checkbox, FormControlLabel, Fade, Modal
} from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginModal({ open, handleClose }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "admin" : "user") : value,
    }));
  };

  const handleSubmit = async () => {
    const url = isRegister
      ? "http://localhost:5001/api/register"
      : "http://localhost:5001/api/login";

    try {
      const res = await axios.post(url, formData);
      if (!isRegister) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        handleClose();
        navigate("/home");
      } else {
        alert("Registered successfully! Please log in.");
        setIsRegister(false);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Fade in={open} timeout={600}>
          <Paper
            elevation={8}
            sx={{
              backdropFilter: "blur(16px)",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: 5,
              borderRadius: 4,
              maxWidth: 400,
              width: "90%",
              color: "#fff",
            }}
          >
            <Box textAlign="center" mb={3}>
              <IconButton
                sx={{
                  background: "linear-gradient(45deg, #00feba, #5b86e5)",
                  color: "#fff",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  boxShadow: "0 0 20px #00feba",
                }}
              >
                <StarsIcon fontSize="large" />
              </IconButton>
              <Typography variant="h5" mt={2} fontWeight="bold">
                {isRegister ? "Create an Account" : "Welcome to Quizz!"}
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Email"
              variant="filled"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                mb: 2,
                input: { color: "white" },
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 1,
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="filled"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                mb: 2,
                input: { color: "white" },
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 1,
                },
              }}
            />

            {isRegister && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                    name="role"
                    sx={{ color: "#00feba" }}
                  />
                }
                label="Register as Admin"
                sx={{ color: "#fff", mb: 2 }}
              />
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: "linear-gradient(to right, #00feba, #5b86e5)",
                color: "#000",
                fontWeight: "bold",
                boxShadow: "0 0 10px #00feba",
                mb: 2,
                ":hover": {
                  background: "linear-gradient(to right, #5b86e5, #00feba)",
                  transform: "scale(1.02)",
                },
              }}
            >
              {isRegister ? "Register" : "Log In"}
            </Button>

            <Typography align="center" variant="body2" sx={{ color: "#ccc" }}>
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <Button
                    onClick={() => setIsRegister(false)}
                    sx={{ color: "#00feba", textTransform: "none" }}
                  >
                    Log In
                  </Button>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <Button
                    onClick={() => setIsRegister(true)}
                    sx={{ color: "#5b86e5", textTransform: "none" }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Typography>
          </Paper>
        </Fade>
      </Box>
    </Modal>
  );
}

export default LoginModal;
