import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  RadioGroup,
  Radio,
  FormControlLabel,
  Fade,
  Paper,
  Slide,
  Divider,
} from '@mui/material';

import CelebrationIcon from '@mui/icons-material/EmojiEvents';
import QuizIcon from '@mui/icons-material/Quiz';

function GuestAttemptQuiz() {
  const { quizCode } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [name, setName] = useState('');
  const [nameEntered, setNameEntered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/guest-quizzes/code/${quizCode}`);
        setQuiz(res.data);
      } catch (error) {
        alert('Quiz not found');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizCode]);

  const handleAnswer = (e) => {
    setAnswers({ ...answers, [current]: e.target.value });
  };

  const handleNext = async () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      let points = 0;
      quiz.questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) points++;
      });
      setScore(points);

      try {
        await axios.post(`http://localhost:5001/api/guest-quizzes/attempt/${quizCode}`, {
          name,
          score: points,
        });
      } catch (err) {
        alert(err.response?.data?.message || "Error submitting score");
      }
    }
  };

  const isLastQuestion = useMemo(
    () => quiz && current === quiz.questions.length - 1,
    [quiz, current]
  );

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Loading quiz...</Typography>
      </Box>
    );
  }

  if (!quiz) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No quiz found</Typography>
      </Box>
    );
  }

  if (score !== null) {
    return (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Paper elevation={4} sx={{ p: 5, m: 4, textAlign: 'center', borderRadius: 4 }}>
          <CelebrationIcon fontSize="large" color="warning" />
          <Typography variant="h4" mt={2}>
            Great job, {name}!
          </Typography>
          <Typography variant="h5" mt={1}>
            Your Score: {score} / {quiz.questions.length}
          </Typography>
        </Paper>
      </Slide>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      {!nameEntered ? (
        <Fade in={!nameEntered}>
          <Card elevation={6}>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <QuizIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" mt={1}>Enter Your Name to Start</Typography>
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                fullWidth
                sx={{ mt: 3 }}
                size="large"
                variant="contained"
                onClick={() => name.trim() && setNameEntered(true)}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </Fade>
      ) : (
        <Fade in={nameEntered}>
          <Card elevation={5}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Q{current + 1}: {quiz.questions[current].questionText}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <RadioGroup
                value={answers[current] || ''}
                onChange={handleAnswer}
              >
                {quiz.questions[current].options.map((opt, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={opt}
                    control={<Radio />}
                    label={opt}
                  />
                ))}
              </RadioGroup>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                disabled={!answers[current]}
                onClick={handleNext}
              >
                {isLastQuestion ? 'Submit' : 'Next'}
              </Button>
            </CardContent>
          </Card>
        </Fade>
      )}
    </Box>
  );
}

export default GuestAttemptQuiz;
