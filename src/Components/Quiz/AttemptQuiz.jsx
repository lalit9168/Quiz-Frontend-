import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../api";
import emailjs from "emailjs-com";

function AttemptQuiz() {
  const { code } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const token = localStorage.getItem("token");
  const timerRef = useRef(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(
          `/api/quizzes/code/${code}`
        );
        const quizData = res.data;
        setQuiz(quizData);

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userEmail = decodedToken.email;

        const userSubmission = quizData.submissions?.find(
          (s) => s.email === userEmail
        );

        if (userSubmission) {
          setAlreadyAttempted(true);
          setScore(userSubmission.score);
          const mappedAnswers = {};
          userSubmission.selectedAnswers.forEach((a, idx) => {
            mappedAnswers[idx] = a.selectedOption;
          });
          setAnswers(mappedAnswers);
          return;
        }

        // Normal attempt logic
        const duration = quizData.duration; // minutes
        const startKey = `quizStartTime_${code}`;
        let startTime = localStorage.getItem(startKey);

        if (!startTime) {
          startTime = new Date().toISOString();
          localStorage.setItem(startKey, startTime);
        }

        const endTime = new Date(
          new Date(startTime).getTime() + duration * 60000
        );

        const interval = setInterval(() => {
          const now = new Date();
          const diff = endTime - now;

          if (diff <= 0) {
            clearInterval(interval);
            setTimeLeft(0);
            if (!submittedRef.current) {
              submittedRef.current = true;
              handleAutoSubmit();
            }
          } else {
            setTimeLeft(diff);
          }
        }, 1000);

        timerRef.current = interval;
      } catch (err) {
        console.error("Quiz not found", err);
      }
    };

    fetchQuiz();
    return () => clearInterval(timerRef.current);
  }, [code, token]);

  const handleOptionChange = (e) => {
    setAnswers({ ...answers, [current]: e.target.value });
  };

  const calculateScore = () => {
    let points = 0;
    const selectedAnswers = [];

    quiz.questions.forEach((q, idx) => {
      const selected = answers[idx];
      if (selected === q.correctAnswer) {
        points++;
      }
      selectedAnswers.push({
        questionText: q.questionText,
        selectedOption: selected,
        correctAnswer: q.correctAnswer,
      });
    });

    return { points, selectedAnswers };
  };

 

const submitQuiz = async () => {
  const { points, selectedAnswers } = calculateScore();
  setScore(points);

  try {
    // Step 1: Submit to backend
    await api.post(`/api/quizzes/submit/${code}`, {
      token,
      score: points,
      selectedAnswers,
    });

    clearInterval(timerRef.current);
    localStorage.removeItem(`quizStartTime_${code}`);
    setTimeLeft(null);

    // Step 2: Generate PDF
    const pdfDoc = new jsPDF();
    downloadPDF(pdfDoc); // Fill in content
    const pdfBase64 = pdfDoc.output("datauristring").split(",")[1]; // Remove prefix

    // Step 3: Get user details
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userEmail = decodedToken?.email;
    const userName = decodedToken?.name || "User";

    if (!userEmail || userEmail.trim() === "") {
      alert("Email address not found. Cannot send scorecard.");
      return;
    }

    // Step 4: Send email with base64 PDF in body
    await emailjs.send(
      "service_xsl27oo",
      "template_g8c6hfe",
      {
        to_email: userEmail,
        from_name: userName,
        title: quiz.title,
        message: `You scored ${points}/${quiz.questions.length} in the quiz: ${quiz.title}`,
        pdf_base64: pdfBase64, // Only the base64 part (no prefix)
      },
      "amqojsEuLsl4OgVm1"
    );

    alert("Scorecard has been emailed successfully!");
  } catch (err) {
    console.error("Email failed", err);
    alert("Failed to send scorecard.");
  }
};
  const handleAutoSubmit = () => {
    if (!submittedRef.current) {
      submittedRef.current = true;

      const { points, selectedAnswers } = calculateScore();
      setScore(points); // Force re-render immediately

      api
        .post(`/api/quizzes/submit/${code}`, {
          token,
          score: points,
          selectedAnswers,
        })
        .then(() => {
          clearInterval(timerRef.current);
          localStorage.removeItem(`quizStartTime_${code}`);
          setTimeLeft(null);
        })
        .catch((err) => {
          console.error("Auto-submit failed", err);
        });
    }
  };

  const handleNext = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      if (!submittedRef.current) {
        submittedRef.current = true;
        submitQuiz();
      }
    }
  };

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const downloadPDF = () => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const name = decodedToken.name || "User";
  const email = decodedToken.email;

  const doc = new jsPDF();
  
  // Set up colors
  const primaryColor = [41, 128, 185]; // Professional blue
  const successColor = [39, 174, 96]; // Green
  const errorColor = [231, 76, 60]; // Red
  const grayColor = [149, 165, 166]; // Light gray
  const darkColor = [44, 62, 80]; // Dark blue-gray

  // Header Background
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 35, 'F');

  // App Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("QuizApplication", 105, 15, null, null, "center");
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Performance Score Card", 105, 25, null, null, "center");

  // Reset text color for content
  doc.setTextColor(...darkColor);
  
  // User Information Section
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Student Information", 15, 50);
  
  // Draw a subtle line under section header
  doc.setDrawColor(...grayColor);
  doc.setLineWidth(0.5);
  doc.line(15, 52, 195, 52);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${name}`, 20, 62);
  doc.text(`Email: ${email}`, 20, 70);
  doc.text(`Quiz Title: ${quiz.title}`, 20, 78);
  
  // Score Section with visual indicator
  const percentage = Math.round((score / quiz.questions.length) * 100);
  let scoreColor = errorColor;
  let scoreLabel = "Needs Improvement";
  
  if (percentage >= 80) {
    scoreColor = successColor;
    scoreLabel = "Excellent";
  } else if (percentage >= 60) {
    scoreColor = [243, 156, 18]; // Orange
    scoreLabel = "Good";
  }

  doc.setFont("helvetica", "bold");
  doc.text("Final Score:", 20, 90);
  
  doc.setTextColor(...scoreColor);
  doc.setFontSize(14);
  doc.text(`${score} / ${quiz.questions.length} (${percentage}%)`, 70, 90);
  
  doc.setFontSize(10);
  doc.text(`Performance: ${scoreLabel}`, 70, 98);

  // Reset color for table
  doc.setTextColor(...darkColor);

  // Detailed Results Section
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Detailed Results", 15, 115);
  
  doc.setDrawColor(...grayColor);
  doc.line(15, 117, 195, 117);

  // Prepare table data with enhanced formatting
  const tableData = quiz.questions.map((q, idx) => {
    const selected = answers[idx] || "Not answered";
    const correct = q.correctAnswer;
    const isCorrect = selected === correct;
    
    // Truncate long questions for better display
    const questionText = q.questionText.length > 60 
      ? q.questionText.substring(0, 60) + "..." 
      : q.questionText;
    
    return [
      idx + 1,
      questionText,
      selected,
      correct,
      isCorrect ? "Correct" : "Wrong"
    ];
  });

  // Enhanced table with custom styling
  autoTable(doc, {
    startY: 125,
    head: [["#", "Question", "Your Answer", "Correct Answer", "Status"]],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
      align: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      textColor: darkColor
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { cellWidth: 70 },
      2: { cellWidth: 40 },
      3: { cellWidth: 40 },
      4: { 
        halign: 'center', 
        cellWidth: 15,
        textColor: (rowIndex) => {
          const isCorrect = tableData[rowIndex][4].includes("✓");
          return isCorrect ? successColor : errorColor;
        }
      }
    },
    alternateRowStyles: {
      fillColor: [248, 249, 250]
    },
    margin: { left: 18, right: 20 },
    didDrawCell: (data) => {
      // Add custom styling for status column
      if (data.column.index === 4) {
        const isCorrect = data.cell.text[0].includes("✓");
        doc.setTextColor(...(isCorrect ? successColor : errorColor));
        doc.setFont("helvetica", "bold");
      }
    }
  });

  // Footer
  const finalY = doc.lastAutoTable.finalY + 20;
  
  // Performance summary box
  doc.setFillColor(248, 249, 250);
  doc.rect(15, finalY, 180, 25, 'F');
  
  doc.setDrawColor(...grayColor);
  doc.rect(15, finalY, 180, 25, 'S');
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Performance Summary:", 20, finalY + 8);
  
  doc.setFont("helvetica", "normal");
  const correctAnswers = tableData.filter(row => row[4].includes("✓")).length;
  const wrongAnswers = quiz.questions.length - correctAnswers;
  
  doc.text(`Correct Answers: ${correctAnswers}`, 20, finalY + 16);
  doc.text(`Wrong Answers: ${wrongAnswers}`, 80, finalY + 16);
  doc.text(`Accuracy: ${percentage}%`, 140, finalY + 16);

  // Generated timestamp
  doc.setFontSize(8);
  doc.setTextColor(...grayColor);
  const timestamp = new Date().toLocaleString();
  doc.text(`Generated on: ${timestamp}`, 15, finalY + 35);
  doc.text("Powered by QuizApplication", 105, finalY + 35, null, null, "center");

  // Save with enhanced filename
  const sanitizedQuizTitle = quiz.title.replace(/[^a-z0-9]/gi, '_');
  const sanitizedName = name.replace(/[^a-z0-9]/gi, '_');
  const dateStr = new Date().toISOString().split('T')[0];
  
  doc.save(`QuizApp_ScoreCard_${sanitizedQuizTitle}_${sanitizedName}_${dateStr}.pdf`);
};

  if (!quiz) return <Typography sx={{ p: 3 }}>Loading quiz...</Typography>;

  if (alreadyAttempted)
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" color="success.main" gutterBottom>
          You have already attempted this quiz.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Your Score: {score} / {quiz.questions.length}
        </Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={downloadPDF}>
          Download Score Card
        </Button>
      </Box>
    );

  const question = quiz.questions[current];

  return (
    <Box sx={{ display: "flex", p: 4, gap: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          {quiz.title}
        </Typography>

        {score === null && timeLeft !== null && (
          <Typography
            variant="h6"
            sx={{ color: timeLeft < 60000 ? "red" : "green", mb: 2 }}
          >
            Time Left: {formatTime(timeLeft)}
          </Typography>
        )}

        {score === null ? (
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">
                Q{current + 1}: {question.questionText}
              </Typography>
              <RadioGroup
                value={answers[current] || ""}
                onChange={handleOptionChange}
                sx={{ mt: 2 }}
              >
                {question.options.map((opt, idx) => (
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
                onClick={handleNext}
                sx={{ mt: 2 }}
                disabled={!answers[current]}
              >
                {current === quiz.questions.length - 1 ? "Submit" : "Next"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">
              Your Score: {score} / {quiz.questions.length}
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={downloadPDF}>
              Download Score Card
            </Button>
          </Box>
        )}
      </Box>

      {/* Right-side Navigation Panel */}
      <Box
        sx={{
          width: 180,
          bgcolor: "#f1f1f1",
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
          alignSelf: "flex-start",
          position: "sticky",
          top: 80,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Questions
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {quiz.questions.map((_, idx) => (
            <Button
              key={idx}
              variant={answers[idx] ? "contained" : "outlined"}
              color={
                current === idx
                  ? "secondary"
                  : answers[idx]
                  ? "success"
                  : "primary"
              }
              size="small"
              onClick={() => setCurrent(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AttemptQuiz;
