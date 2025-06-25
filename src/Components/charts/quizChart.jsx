// src/components/QuizAnalyticsDashboard.jsx

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  useTheme
} from '@mui/material';

import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from 'recharts';

const QuizAnalyticsDashboard = () => {
  const theme = useTheme();

  // --- Sample data ---
  const pieData = [
    { name: 'Correct', value: 75 },
    { name: 'Incorrect', value: 25 },
  ];

  const COLORS = [theme.palette.success.main, theme.palette.error.main];

  const barData = [
    { name: 'Quiz 1', score: 80 },
    { name: 'Quiz 2', score: 90 },
    { name: 'Quiz 3', score: 70 },
    { name: 'Quiz 4', score: 85 },
  ];

  const lineData = [
    { date: 'Jan', score: 70 },
    { date: 'Feb', score: 75 },
    { date: 'Mar', score: 80 },
    { date: 'Apr', score: 85 },
    { date: 'May', score: 90 },
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Quiz Analytics Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Correct vs Incorrect
            </Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ReTooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Score per Quiz
            </Typography>
            <BarChart
              width={300}
              height={300}
              data={barData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <Legend />
              <Bar dataKey="score" fill={theme.palette.primary.main} />
            </BarChart>
          </Paper>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Progress Over Time
            </Typography>
            <LineChart
              width={300}
              height={300}
              data={lineData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ReTooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke={theme.palette.secondary.main} strokeWidth={2} />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuizAnalyticsDashboard;
