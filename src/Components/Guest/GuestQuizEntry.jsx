import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Fade,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import api from "../api";

function GuestQuizEntry() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (code.trim()) {
      navigate(`/guest-attempt/${code}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 100%)",
      }}
    >
      {/* Enhanced Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 0%, rgba(5, 150, 105, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Geometric Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {/* Professional hexagonal patterns */}
        {[
          { size: 80, top: "10%", left: "10%", opacity: 0.03 },
          { size: 60, top: "15%", right: "15%", opacity: 0.04 },
          { size: 100, bottom: "20%", left: "8%", opacity: 0.02 },
          { size: 70, bottom: "10%", right: "12%", opacity: 0.05 },
          { size: 90, top: "60%", left: "85%", opacity: 0.03 },
          { size: 50, top: "40%", left: "5%", opacity: 0.04 },
        ].map((hex, i) => (
          <Box
            key={`hex-${i}`}
            sx={{
              width: hex.size,
              height: hex.size,
              position: "absolute",
              ...hex,
              background: `linear-gradient(135deg, rgba(79, 70, 229, ${hex.opacity}), rgba(124, 58, 237, ${hex.opacity * 0.7}))`,
              clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              animation: `rotate-${i} ${12 + i * 2}s linear infinite`,
              "@keyframes rotate-0": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-1": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-2": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-3": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-4": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-5": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.02,
            backgroundImage: `
              linear-gradient(rgba(79, 70, 229, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79, 70, 229, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </Box>

      <Fade in timeout={600}>
        <Paper
          elevation={8}
          sx={{
            backdropFilter: "blur(16px)",
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(79, 70, 229, 0.1)",
            padding: 5,
            borderRadius: 4,
            maxWidth: 400,
            width: "90%",
            color: "#1e293b",
            position: "relative",
            zIndex: 1,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box textAlign="center" mb={3}>
            <IconButton
              sx={{
                background: "linear-gradient(45deg, #4f46e5, #7c3aed)",
                color: "#fff",
                width: 60,
                height: 60,
                borderRadius: "50%",
                boxShadow: "0 10px 30px rgba(79, 70, 229, 0.3)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 40px rgba(79, 70, 229, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <QuizIcon fontSize="large" />
            </IconButton>
            <Typography 
              variant="h5" 
              mt={2} 
              fontWeight="bold"
              sx={{ 
                color: "#1e293b",
                background: "linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Enter Quiz Code
            </Typography>
            <Typography 
              variant="body2" 
              mt={1}
              sx={{ 
                color: "#64748b",
                fontWeight: 500,
              }}
            >
              Join a quiz as a guest participant
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Quiz Code"
            variant="filled"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            inputProps={{ 
              maxLength: 10, 
              style: { 
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
              } 
            }}
            sx={{
              mb: 3,
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(79, 70, 229, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(79, 70, 229, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(79, 70, 229, 0.08)",
                  borderColor: "rgba(79, 70, 229, 0.2)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(79, 70, 229, 0.08)",
                  borderColor: "#4f46e5",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#64748b",
                fontWeight: 600,
                "&.Mui-focused": {
                  color: "#4f46e5",
                },
              },
              "& .MuiFilledInput-input": {
                color: "#1e293b",
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleStart}
            disabled={!code.trim()}
            sx={{
              background: code.trim() 
                ? "linear-gradient(135deg, #4f46e5, #7c3aed)" 
                : "rgba(59, 130, 246, 0.06)",
              color: "#fff",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: 2,
              boxShadow: code.trim() 
                ? "0 10px 30px rgba(79, 70, 229, 0.3)" 
                : "none",
              fontSize: "1.1rem",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                background: code.trim() 
                  ? "linear-gradient(135deg, #4338ca, #6d28d9)" 
                  : "rgba(148, 163, 184, 0.5)",
                transform: code.trim() ? "translateY(-2px)" : "none",
                boxShadow: code.trim() 
                  ? "0 15px 40px rgba(79, 70, 229, 0.4)" 
                  : "none",
              },
              "&:disabled": {
                color: "#94a3b8",
                cursor: "not-allowed",
              },
            }}
          >
            🚀 Start Quiz
          </Button>

          <Box mt={3} textAlign="center">
            <Button
              onClick={() => navigate('/')}
              sx={{
                border: "2px solid #4f46e5",
                color: "#4f46e5",
                textTransform: "none",
                fontWeight: 600,
                py: 1,
                px: 3,
                borderRadius: 2,
                "&:hover": {
                  borderColor: "#4338ca",
                  color: "#4338ca",
                  backgroundColor: "rgba(79, 70, 229, 0.05)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              ← Back to Login
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

export default GuestQuizEntry;