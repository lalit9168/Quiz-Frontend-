import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  Tabs,
  Tab,
  Stack,
  Button
} from '@mui/material';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area
} from 'recharts';

import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import api from '../api';

const QuizSubmissionsChart = () => {
  const theme = useTheme();
  const { quizCode } = useParams();
  const token = localStorage.getItem('token');

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState(0);

  const chartRef = useRef(null);

  const fetchSubmissionsForQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`api/quizzes/submissions/${quizCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const dataWithMetrics = res.data.map((entry) => {
        const total = entry.selectedAnswers?.length || 0;
        return {
          username: entry.username || entry.email || 'Unknown',
          score: entry.score,
          total,
          incorrect: total - entry.score,
          accuracy: total > 0 ? (entry.score / total) * 100 : 0,
          timeTaken: entry.timeTaken || 0, // optional, fallback to 0
        };
      });

      setSubmissions(dataWithMetrics);
    } catch (err) {
      console.error("Failed to fetch quiz submissions", err);
      setError("Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizCode && token) {
      fetchSubmissionsForQuiz();
    }
  }, [quizCode, token]);

  const handleTabChange = (_, newValue) => setTab(newValue);

  const handleDownloadPNG = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      canvas.toBlob((blob) => {
        saveAs(blob, `${quizCode}-chart.png`);
      });
    }
  };

  const handleDownloadCSV = () => {
    const headers = ['Username', 'Score', 'Total', 'Incorrect', 'Accuracy', 'Time Taken'];
    const rows = submissions.map((s) =>
      [s.username, s.score, s.total, s.incorrect, s.accuracy.toFixed(2), s.timeTaken].join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${quizCode}-submissions.csv`);
  };

  // ---- Derived data for fancy charts ----
  const stats = submissions.length > 0 ? {
    totalParticipants: submissions.length,
    avgScore: (submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length).toFixed(2),
    avgAccuracy: (submissions.reduce((sum, s) => sum + s.accuracy, 0) / submissions.length).toFixed(2),
  } : null;

  const passScore = 5; // example: score >= 5 means pass
  const passFail = [
    { name: "Pass", value: submissions.filter(s => s.score >= passScore).length },
    { name: "Fail", value: submissions.filter(s => s.score < passScore).length },
  ];

  const top5 = [...submissions].sort((a, b) => b.score - a.score).slice(0, 5);

  // Histogram data: bin scores
  const bins = Array(11).fill(0); // bins for score 0 to 10
  submissions.forEach(s => {
    const index = Math.min(Math.round(s.score), 10);
    bins[index]++;
  });
  const histogram = bins.map((count, index) => ({ scoreRange: `${index}`, count }));

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quiz Results: <strong>{quizCode}</strong>
      </Typography>

      {stats && (
        <Box mb={2}>
          <Typography variant="subtitle1">
            Total Participants: <strong>{stats.totalParticipants}</strong> | Average Score: <strong>{stats.avgScore}</strong> | Average Accuracy: <strong>{stats.avgAccuracy}%</strong>
          </Typography>
        </Box>
      )}

      <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" height={200}>
            <CircularProgress size={40} />
          </Box>
        )}

        {error && (
          <Alert severity="error">{error}</Alert>
        )}

        {!loading && !error && submissions.length === 0 && (
          <Alert severity="info">No submissions found for this quiz.</Alert>
        )}

        {!loading && !error && submissions.length > 0 && (
          <>
            <Stack direction="row" spacing={2} mb={2}>
              <Button variant="outlined" onClick={handleDownloadPNG}>
                Download Chart as PNG
              </Button>
              <Button variant="outlined" onClick={handleDownloadCSV}>
                Export Data as CSV
              </Button>
            </Stack>

            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
            >
              <Tab label="Correct vs Total" />
              <Tab label="Accuracy (%)" />
              <Tab label="Time vs Score" />
              <Tab label="Score Distribution" />
              <Tab label="Pass vs Fail" />
              <Tab label="Top 5 Performers" />
            </Tabs>

            <Box ref={chartRef} height={{ xs: 300, md: 500 }}>
              {tab === 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={submissions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="username" angle={-45} textAnchor="end" interval={0} />
                    <YAxis />
                    <ReTooltip />
                    <Legend />
                    <Bar dataKey="total" fill={theme.palette.grey[400]} name="Total Questions" />
                    <Bar dataKey="score" fill={theme.palette.primary.main} name="Correct Answers" />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {tab === 1 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={submissions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="username" angle={-45} textAnchor="end" interval={0} />
                    <YAxis domain={[0, 100]} unit="%" />
                    <ReTooltip />
                    <Legend />
                    <Bar
                      dataKey="accuracy"
                      fill={theme.palette.success.main}
                      name="Accuracy (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {tab === 2 && (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid />
                    <XAxis
                      type="number"
                      dataKey="timeTaken"
                      name="Time Taken (min)"
                      unit="min"
                    />
                    <YAxis
                      type="number"
                      dataKey="score"
                      name="Score"
                    />
                    <ReTooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter
                      name="Students"
                      data={submissions}
                      fill={theme.palette.secondary.main}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              )}

              {tab === 3 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={histogram}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="scoreRange" label={{ value: 'Score', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <ReTooltip />
                    <Legend />
                    <Bar dataKey="count" fill={theme.palette.info.main} name="Students Count" />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {tab === 4 && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={passFail} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill={theme.palette.primary.main} label />
                    <Legend />
                    <ReTooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}

              {tab === 5 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={top5}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="username" />
                    <YAxis />
                    <ReTooltip />
                    <Legend />
                    <Bar dataKey="score" fill={theme.palette.warning.main} name="Score" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default QuizSubmissionsChart;
