import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function QuizAnalytics() {
  const { quizCode } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Replace token with actual auth token if needed
        const token = localStorage.getItem('token');

        const res = await axios.get(
          `http://localhost:5001/api/quizzes/submissions/${quizCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const quizzesRes = await axios.get(
          `http://localhost:5001/api/quizzes/code/${quizCode}`
        );

        setQuizTitle(quizzesRes.data.title);

        setSubmissions(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [quizCode]);

  if (loading)
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (submissions.length === 0)
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No submissions yet for this quiz.</Typography>
      </Box>
    );

  // Prepare data for charts

  // Sort submissions by date/time ascending
  const sortedSubs = submissions
    .slice()
    .sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));

  // Line chart data: Score over time
  const scoreTrendData = sortedSubs.map((s, idx) => ({
    attempt: idx + 1,
    score: s.score,
  }));

  // Average score
  const avgScore =
    submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length;

  // Accuracy per user (score / total questions)
  // We'll assume total questions from first submission selectedAnswers length
  const totalQuestions =
    submissions[0]?.selectedAnswers?.length || 0;

  // Accuracy percentage for each submission
  const accuracyData = submissions.map((s) => ({
    name: s.name || s.email,
    accuracy: ((s.score / totalQuestions) * 100).toFixed(2),
  }));

  // Distribution of scores for bar chart (score counts)
  const scoreCounts = {};
  submissions.forEach((s) => {
    scoreCounts[s.score] = (scoreCounts[s.score] || 0) + 1;
  });
  const scoreDistributionData = Object.entries(scoreCounts).map(
    ([score, count]) => ({
      score: Number(score),
      count,
    })
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quiz Analytics: {quizTitle}
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Score Trend (Over Attempts)
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={scoreTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="attempt" label={{ value: 'Attempt', position: 'insideBottomRight', offset: -5 }} />
            <YAxis domain={[0, totalQuestions]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Score Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={scoreDistributionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="score" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Average Accuracy Per User (%)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={accuracyData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="accuracy" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default QuizAnalytics;
