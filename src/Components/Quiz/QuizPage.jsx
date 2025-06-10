import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Alert,
  Fade,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../api";
import { jwtDecode } from "jwt-decode";

function QuizPage() {
  const [title, setTitle] = useState("teste sample");
  const [duration, setDuration] = useState(60); // One quiz-wide duration
  const [quizCode, setQuizCode] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "this is a question", options: ["option 1", "option 2", "option 3", "option 4"], correctAnswer: "option 1" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };


const handleSubmit = async () => {
  // Check if all required parameters are present
  if (!title || !questions || !duration) {
    alert("Please fill in all required fields.");
    return; // Stop the function if any parameter is missing
  }

  try {
    const token = localStorage.getItem("token");

    // If there's no token, you could also show an alert here
    if (!token) {
      alert("You must be logged in to create a quiz.");
      return;
    }

    // Decode the token to extract the user's information (email and role)
    const decodedToken = jwtDecode(token);
    const { email, role } = decodedToken; // Assuming the JWT contains 'email' and 'role' fields

    // Proceed with the API request if all parameters are present
    const res = await api.post(
      "/quizzes/create",
      { 
        title, 
        questions, 
        duration,
        adminEmail: email, // Include the admin's email from the decoded JWT
        role: role,   // Include the admin's role from the decoded JWT (if necessary)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Assuming the response contains a quizCode
    setQuizCode(res.data.quizCode);
  } catch (err) {
    alert("Failed to create quiz.");
    console.error(err);
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,rgb(138, 216, 231) 0%,rgb(142, 148, 150) 100%)",
        p: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: 900,
          width: "100%",
          p: 4,
          background: "#ffffff",
          borderRadius: 4,
          color: "#333",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#4a5568",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Create Quiz
        </Typography>

        <TextField
          fullWidth
          label="Quiz Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#e2e8f0" },
              "&:hover fieldset": { borderColor: "#667eea" },
              "&.Mui-focused fieldset": { borderColor: "#667eea" },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
          }}
        />

        <TextField
          fullWidth
          type="number"
          label="Quiz Duration (in minutes)"
          variant="outlined"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#e2e8f0" },
              "&:hover fieldset": { borderColor: "#667eea" },
              "&.Mui-focused fieldset": { borderColor: "#667eea" },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
          }}
        />

        {questions.map((q, i) => (
          <Paper
            key={i}
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              background: "#f8fafc",
              borderRadius: 2,
              color: "#4a5568",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#2d3748" }}>
              Question {i + 1}
            </Typography>

            <TextField
              fullWidth
              label="Question Text"
              variant="outlined"
              value={q.questionText}
              onChange={(e) => handleChange(i, "questionText", e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "& fieldset": { borderColor: "#e2e8f0" },
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />

            <Grid container spacing={2}>
              {q.options.map((opt, j) => (
                <Grid item xs={12} sm={6} key={j}>
                  <TextField
                    fullWidth
                    label={`Option ${j + 1}`}
                    variant="outlined"
                    value={opt}
                    onChange={(e) => handleOptionChange(i, j, e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#ffffff",
                        "& fieldset": { borderColor: "#e2e8f0" },
                        "&:hover fieldset": { borderColor: "#667eea" },
                        "&.Mui-focused fieldset": { borderColor: "#667eea" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <TextField
              fullWidth
              label="Correct Answer"
              variant="outlined"
              value={q.correctAnswer}
              onChange={(e) => handleChange(i, "correctAnswer", e.target.value)}
              sx={{
                mt: 3,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "& fieldset": { borderColor: "#e2e8f0" },
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
          </Paper>
        ))}

        <Box textAlign="center" mb={4}>
          <IconButton
            onClick={addQuestion}
            sx={{
              color: "#667eea",
              border: "2px dashed #667eea",
              p: 2,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#667eea11",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
          <Typography mt={1} sx={{ color: "#718096" }}>
            Add Question
          </Typography>
        </Box>

        <Box textAlign="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              background:
                "linear-gradient(135deg,rgb(42, 211, 48) 0%,rgb(19, 243, 123) 100%)",
              color: "#ffffff",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              boxShadow: "0 4px 15px rgba(183, 184, 187, 0.4)",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 20px rgba(202, 203, 209, 0.6)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Submit Quiz
          </Button>
        </Box>

        {quizCode && (
          <Fade in={true}>
            <Alert
              severity="success"
              sx={{
                mt: 4,
                backgroundColor: "#f0fff4",
                border: "1px solid #9ae6b4",
                "& .MuiAlert-icon": {
                  color: "#38a169",
                },
              }}
            >
              Quiz Created! Share this code: <strong>{quizCode}</strong>
            </Alert>
          </Fade>
        )}
      </Paper>
    </Box>
  );
}

export default QuizPage;
