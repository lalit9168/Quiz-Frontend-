import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Paper, Divider,
  Accordion, AccordionSummary, AccordionDetails, Tooltip,
  Fade
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

function CreateGuestQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);
  const [quizzes, setQuizzes] = useState([]);
  const [expandedQuizCode, setExpandedQuizCode] = useState(null);
  const [attemptsMap, setAttemptsMap] = useState({});

  const token = localStorage.getItem('token');

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/guest-quizzes/all');
      setQuizzes(res.data);
    } catch {
      alert('Failed to fetch quizzes');
    }
  };

  const fetchAttempts = async (quizCode) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/guest-quizzes/attempts/${quizCode}`);
      setAttemptsMap(prev => ({ ...prev, [quizCode]: res.data }));
    } catch {
      alert('Failed to fetch attempts');
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

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
    setQuestions([...questions, {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }]);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/guest-quizzes/create', {
        title,
        questions,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`Guest Quiz Created! Code: ${res.data.quizCode}`);
      setTitle('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
      fetchQuizzes();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating quiz');
    }
  };

  const handleDelete = async (quizCode) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/guest-quizzes/delete/${quizCode}`);
      fetchQuizzes();
    } catch {
      alert('Failed to delete quiz');
    }
  };

  const toggleAccordion = (quizCode) => {
    if (expandedQuizCode === quizCode) {
      setExpandedQuizCode(null);
    } else {
      setExpandedQuizCode(quizCode);
      fetchAttempts(quizCode);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,rgb(157, 203, 211) 0%,rgb(219, 218, 220) 100%)',
        py: 5,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
    >
      <Fade in timeout={700}>
        <Paper
          elevation={12}
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 5,
            p: 4,
            maxWidth: 900,
            width: '100%',
            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              color: '#667eea',
              textAlign: 'center'
            }}
          >
            Create Guest Quiz
          </Typography>

          <TextField
            fullWidth
            label="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mb: 4,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#667eea" },
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
                mb: 3,
                p: 3,
                backgroundColor: '#f8f9ff',
                border: '1px solid #e0e4ff',
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: '#667eea', mb: 2 }}
              >
                Question {i + 1}
              </Typography>
              <TextField
                fullWidth
                label="Question"
                value={q.questionText}
                onChange={(e) => handleChange(i, 'questionText', e.target.value)}
                sx={{ 
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#667eea" },
                    "&:hover fieldset": { borderColor: "#667eea" },
                    "&.Mui-focused fieldset": { borderColor: "#667eea" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
                }}
              />
              {q.options.map((opt, j) => (
                <TextField
                  key={j}
                  fullWidth
                  label={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  sx={{ 
                    mb: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#667eea" },
                      "&:hover fieldset": { borderColor: "#667eea" },
                      "&.Mui-focused fieldset": { borderColor: "#667eea" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
                  }}
                />
              ))}
              <TextField
                fullWidth
                label="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) => handleChange(i, 'correctAnswer', e.target.value)}
                sx={{ 
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#667eea" },
                    "&:hover fieldset": { borderColor: "#667eea" },
                    "&.Mui-focused fieldset": { borderColor: "#667eea" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
                }}
              />
            </Paper>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addQuestion}
            sx={{
              mb: 3,
              borderColor: "#667eea",
              color: "#667eea",
              "&:hover": {
                backgroundColor: "#667eea22",
                transform: "scale(1.05)",
                borderColor: "#667eea",
              },
            }}
          >
            Add Question
          </Button>

          <br />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              py: 1.5,
              px: 4,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#ffffff",
              fontWeight: "bold",
              boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 12px 25px rgba(102, 126, 234, 0.5)",
              },
            }}
          >
            Submit Quiz
          </Button>

          <Divider sx={{ my: 5, borderColor: '#e0e4ff' }} />

          <Typography variant="h5" sx={{ mb: 2, color: '#667eea' }}>
            Existing Guest Quizzes
          </Typography>

          {quizzes.map((quiz) => (
            <Accordion
              key={quiz.quizCode}
              expanded={expandedQuizCode === quiz.quizCode}
              onChange={() => toggleAccordion(quiz.quizCode)}
              sx={{
                backgroundColor: "#f8f9ff",
                border: "1px solid #e0e4ff",
                mb: 2,
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#667eea' }} />}>
                <Typography flexGrow={1} sx={{ color: '#333' }}>
                  {quiz.title} (Code: {quiz.quizCode})
                </Typography>
                <Tooltip title="Delete Quiz">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(quiz.quizCode);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#333' }}>
                  Total Questions: {quiz.questions.length}
                </Typography>

                {attemptsMap[quiz.quizCode]?.length > 0 ? (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: '#333' }}>Attempts:</Typography>
                    {attemptsMap[quiz.quizCode].map((a, idx) => (
                      <Typography key={idx} sx={{ ml: 2, color: '#666' }}>
                        {idx + 1}. {a.name} - Score: {a.score}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ ml: 2, color: '#999' }}>
                    No attempts yet.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Fade>
    </Box>
  );
}

export default CreateGuestQuiz;