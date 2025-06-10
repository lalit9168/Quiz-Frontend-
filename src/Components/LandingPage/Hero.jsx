import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Quiz as QuizIcon, 
  EmojiEvents as TrophyIcon, 
  Speed as SpeedIcon,
  Group as GroupIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Psychology as PsychologyIcon,
  Timeline as TimelineIcon
} from "@mui/icons-material";
import Navbar from "../Layout/Navbar";
import LoginModal from "../Auth/LoginModal";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const navigate = useNavigate();

  const stats = [
    { number: "50K+", label: "Active Learners", icon: <GroupIcon /> },
    { number: "10K+", label: "Quizzes Available", icon: <QuizIcon /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUpIcon /> },
    { number: "4.9", label: "User Rating", icon: <StarIcon /> }
  ];

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 42, color: '#4f46e5' }} />,
      title: "Adaptive Learning",
      description: "Personalized quiz experiences that adapt to your learning pace and knowledge level"
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 42, color: '#7c3aed' }} />,
      title: "Smart Analytics",
      description: "Deep insights into your performance with detailed progress tracking and recommendations"
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 42, color: '#059669' }} />,
      title: "Progress Tracking",
      description: "Monitor your improvement over time with comprehensive performance metrics"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar openLogin={() => setShowModal(true)} />

      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 100%)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
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
            zIndex: 0,
            pointerEvents: "none",
            background: `
              radial-gradient(circle at 20% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(5, 150, 105, 0.05) 0%, transparent 50%)
            `
          }}
        />

        {/* Sophisticated Geometric Elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {/* Hexagonal patterns */}
          {[
            { size: 100, top: "10%", left: "15%", delay: 0, opacity: 0.06 },
            { size: 80, top: "20%", right: "20%", delay: 1, opacity: 0.04 },
            { size: 120, bottom: "15%", left: "10%", delay: 2, opacity: 0.08 },
            { size: 60, bottom: "25%", right: "15%", delay: 1.5, opacity: 0.05 },
            { size: 90, top: "50%", left: "75%", delay: 0.5, opacity: 0.07 }
          ].map((hex, i) => (
            <motion.div
              key={`hex-${i}`}
              style={{
                width: hex.size,
                height: hex.size,
                position: "absolute",
                ...hex,
                background: `linear-gradient(135deg, rgba(79, 70, 229, ${hex.opacity}), rgba(124, 58, 237, ${hex.opacity * 0.7}))`,
                clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [hex.opacity, hex.opacity * 2, hex.opacity]
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: hex.delay,
              }}
            />
          ))}

          {/* Academic icons floating */}
          {[
            { Icon: QuizIcon, top: "15%", right: "25%", delay: 1 },
            { Icon: SchoolIcon, bottom: "20%", right: "12%", delay: 2.5 },
            { Icon: TrophyIcon, top: "35%", left: "8%", delay: 3.5 },
            { Icon: PsychologyIcon, bottom: "40%", left: "80%", delay: 1.8 }
          ].map(({ Icon, ...props }, i) => (
            <motion.div
              key={`academic-icon-${i}`}
              style={{
                position: "absolute",
                color: "rgba(79, 70, 229, 0.12)",
                fontSize: "48px",
                ...props
              }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.12, 0.25, 0.12],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: props.delay,
              }}
            >
              <Icon sx={{ fontSize: 48 }} />
            </motion.div>
          ))}
        </Box>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center" sx={{ minHeight: "85vh" }}>
            {/* Left Content */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Box sx={{ mb: 4 }}>
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 3,
                        py: 1,
                        mb: 3,
                        borderRadius: 50,
                        background: "rgba(79, 70, 229, 0.15)",
                        border: "1px solid rgba(79, 70, 229, 0.3)",
                        backdropFilter: "blur(10px)"
                      }}
                    >
                      <StarIcon sx={{ fontSize: 16, color: '#4f46e5' }} />
                      <Typography sx={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 600 }}>
                        Trusted by 50,000+ Students
                      </Typography>
                    </Box>
                  </motion.div>

                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "2.8rem", md: "4rem", lg: "4.5rem" },
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.1,
                      mb: 3,
                    }}
                  >
                    Master Knowledge Through
                    <Box 
                      component="span" 
                      sx={{ 
                        display: "block",
                        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Intelligent Quizzing
                    </Box>
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      color: "#94a3b8",
                      mb: 4,
                      fontWeight: 400,
                      letterSpacing: "0.005em",
                      lineHeight: 1.6,
                      maxWidth: "540px",
                      fontSize: { xs: "1.1rem", md: "1.25rem" }
                    }}
                  >
                    Elevate your learning experience with adaptive quizzes, comprehensive analytics, and 
                    <Box component="span" sx={{ color: "#4f46e5", fontWeight: 600 }}>
                      {" "}personalized progress tracking.
                    </Box>
                  </Typography>

                  {/* Enhanced Action Buttons */}
                  <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/login")}
                        startIcon={<SchoolIcon />}
                        sx={{
                          px: 5,
                          py: 2.5,
                          fontWeight: 700,
                          borderRadius: 3,
                          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                          boxShadow: "0 10px 40px rgba(79, 70, 229, 0.3)",
                          color: "#ffffff",
                          fontSize: "1.1rem",
                          textTransform: "none",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                            boxShadow: "0 15px 50px rgba(79, 70, 229, 0.4)",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        Begin Learning Journey
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/guest-quiz-entry")}
                        startIcon={<QuizIcon />}
                        sx={{
                          px: 5,
                          py: 2.5,
                          fontWeight: 600,
                          borderRadius: 3,
                          borderColor: "rgba(148, 163, 184, 0.4)",
                          color: "#e2e8f0",
                          fontSize: "1.1rem",
                          textTransform: "none",
                          backdropFilter: "blur(10px)",
                          background: "rgba(148, 163, 184, 0.05)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            backgroundColor: "rgba(148, 163, 184, 0.1)",
                            borderColor: "#94a3b8",
                            transform: "translateY(-3px)",
                            boxShadow: "0 10px 40px rgba(148, 163, 184, 0.2)"
                          },
                        }}
                      >
                        Try Demo Quiz
                      </Button>
                    </motion.div>
                  </Box>

                  {/* Enhanced Dynamic Stats */}
                  <Box 
                    sx={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: 3,
                      px: 4,
                      py: 3,
                      borderRadius: 3,
                      background: "rgba(15, 23, 42, 0.6)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(148, 163, 184, 0.1)",
                      maxWidth: "fit-content"
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStat}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ display: "flex", alignItems: "center", gap: 16 }}
                      >
                        <Box 
                          sx={{ 
                            color: "#4f46e5", 
                            fontSize: 28,
                            p: 1.5,
                            borderRadius: 2,
                            background: "rgba(79, 70, 229, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {stats[currentStat].icon}
                        </Box>
                        <Box>
                          <Typography variant="h4" sx={{ color: "#f8fafc", fontWeight: 800, mb: 0, lineHeight: 1.2 }}>
                            {stats[currentStat].number}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 500, fontSize: "0.9rem" }}>
                            {stats[currentStat].label}
                          </Typography>
                        </Box>
                      </motion.div>
                    </AnimatePresence>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Content - Enhanced Features */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                    >
                      <Card
                        sx={{
                          background: "rgba(15, 23, 42, 0.4)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(148, 163, 184, 0.15)",
                          borderRadius: 4,
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            background: "rgba(15, 23, 42, 0.6)",
                            border: "1px solid rgba(79, 70, 229, 0.4)",
                            transform: "translateY(-8px)",
                            boxShadow: "0 20px 60px rgba(79, 70, 229, 0.15)"
                          }
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                            <Box sx={{ 
                              p: 2.5, 
                              borderRadius: 3, 
                              background: "rgba(79, 70, 229, 0.1)",
                              border: "1px solid rgba(79, 70, 229, 0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              {feature.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  color: "#f8fafc", 
                                  fontWeight: 700, 
                                  mb: 1.5,
                                  fontSize: "1.3rem",
                                  lineHeight: 1.3
                                }}
                              >
                                {feature.title}
                              </Typography>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  color: "#94a3b8", 
                                  lineHeight: 1.6,
                                  fontSize: "0.95rem"
                                }}
                              >
                                {feature.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Box>

                {/* Enhanced Quiz Preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Box
                    sx={{
                      mt: 4,
                      p: 5,
                      borderRadius: 4,
                      background: "rgba(15, 23, 42, 0.6)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(79, 70, 229, 0.3)",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    {/* Gradient overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05))",
                        zIndex: 0
                      }}
                    />
                    
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Box sx={{ 
                        display: "inline-flex",
                        p: 3,
                        borderRadius: 4,
                        background: "rgba(79, 70, 229, 0.15)",
                        mb: 3
                      }}>
                        <QuizIcon sx={{ fontSize: 60, color: "#4f46e5" }} />
                      </Box>
                      <Typography variant="h5" sx={{ color: "#f8fafc", mb: 2, fontWeight: 700 }}>
                        Advanced Quiz Platform
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#94a3b8", lineHeight: 1.6 }}>
                        Experience our cutting-edge quiz interface designed with modern pedagogy principles
                        for optimal knowledge retention and engagement
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Enhanced bottom decoration */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.5), rgba(124, 58, 237, 0.5), transparent)",
          }}
        />
      </Box>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default Hero;