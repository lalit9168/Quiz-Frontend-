import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function Leaderboard() {
  const { quizCode } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `http://localhost:5001/api/quizzes/submissions/${quizCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const quizRes = await axios.get(
          `http://localhost:5001/api/quizzes/code/${quizCode}`
        );

        setQuizTitle(quizRes.data.title);

        // Sort descending by score
        const sorted = res.data.slice().sort((a, b) => b.score - a.score);

        setSubmissions(sorted);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard: {quizTitle}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name / Email</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((s, idx) => (
              <TableRow key={s.email + idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{s.name || s.email}</TableCell>
                <TableCell>{s.score}</TableCell>
                <TableCell>{s.date}</TableCell>
                <TableCell>{s.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Leaderboard;
