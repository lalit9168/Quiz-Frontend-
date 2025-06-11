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
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api";
import { jwtDecode } from "jwt-decode";

function QuizPage() {
  const [title, setTitle] = useState("teste sample");
  const [duration, setDuration] = useState(60);
  const [quizCode, setQuizCode] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
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

  const deleteQuestion = (index) => {
    if (questions.length === 1) {
      alert("At least one question is required.");
      return;
    }

    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    // Check if basic fields are filled
    if (!title || !questions.length || !duration) {
      alert("Please fill in all required fields.");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      // Check if question text is empty
      if (!q.questionText.trim()) {
        alert(`Question ${i + 1} is missing the question text.`);
        return;
      }

      // Check if any option is empty
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          alert(`Option ${j + 1} for Question ${i + 1} is empty.`);
          return;
        }
      }

      // Check if options are unique
      const optionSet = new Set(q.options.map((opt) => opt.trim()));
      if (optionSet.size < q.options.length) {
        alert(`Options for Question ${i + 1} must be unique.`);
        return;
      }

      // Check if correct answer is filled
      if (!q.correctAnswer.trim()) {
        alert(`Question ${i + 1} is missing the correct answer.`);
        return;
      }

      // Optional: check if correct answer is among options
      if (!optionSet.has(q.correctAnswer.trim())) {
        alert(
          `Correct answer for Question ${i + 1} must match one of the options.`
        );
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create a quiz.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const { email, role } = decodedToken;

      const res = await api.post(
        "api/quizzes/create",
        {
          title,
          questions,
          duration,
          adminEmail: email,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" sx={{ color: "#2d3748" }}>
                Question {i + 1}
              </Typography>
              <IconButton
                onClick={() => deleteQuestion(i)}
                sx={{
                  color: "#e53e3e",
                  "&:hover": {
                    backgroundColor: "#fed7d7",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

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
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Select
              fullWidth
              value={q.correctAnswer}
              onChange={(e) => handleChange(i, "correctAnswer", e.target.value)}
              displayEmpty
              sx={{
                mt: 3,
                backgroundColor: "#ffffff",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#e2e8f0" },
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            >
              <MenuItem value="" disabled>
                Select Correct Answer
              </MenuItem>
              {q.options.map((opt, idx) => (
                <MenuItem key={idx} value={opt}>
                  {opt || `Option ${idx + 1}`}
                </MenuItem>
              ))}
            </Select>
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
