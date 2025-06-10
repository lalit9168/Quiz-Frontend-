import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Slide,
  useScrollTrigger,
  Fab,
  Zoom,
  Container,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

// Scroll to top component
function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
      >
        <Fab size="medium" aria-label="scroll back to top" sx={styles.scrollTop}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const navigate = useNavigate();

  // Handle scroll effect for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', action: () => navigate('/') },
    { name: 'Login', path: '/login', action: () => navigate('/login') },
    { name: 'Feedback', path: '/feedback', action: () => navigate('/feedback') },
    { name: 'Contact Us', path: '/contact', action: () => navigate('/contact') },
  ];

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar 
          position="fixed" 
          sx={{
            ...styles.appbar,
            boxShadow: isScrolled 
              ? '0 8px 32px rgba(0, 0, 0, 0.12)' 
              : '0 4px 16px rgba(0, 0, 0, 0.06)',
            backgroundColor: isScrolled ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={styles.toolbar}>
              {/* Logo/Brand Section */}
              <Box sx={styles.logoContainer}>
                <Box sx={styles.logoIconWrapper}>
                  <QuizIcon sx={styles.logoIcon} />
                  <Box sx={styles.logoGlow} />
                </Box>
                <Box sx={styles.brandContainer}>
                  <Typography variant="h4" sx={styles.title}>
                    QuizApplication
                  </Typography>
                  <Typography variant="caption" sx={styles.subtitle}>
                    Professional Learning Platform
                  </Typography>
                </Box>
              </Box>

              {/* Navigation Links */}
              <Box sx={styles.linkContainer}>
                {navItems.map((item, index) => (
                  <Button
                    key={item.name}
                    onClick={item.action}
                    onMouseEnter={() => setHoveredButton(item.name)}
                    onMouseLeave={() => setHoveredButton(null)}
                    sx={{
                      ...styles.linkButton,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <Typography sx={styles.buttonText}>
                      {item.name}
                    </Typography>
                    <Box 
                      sx={{
                        ...styles.hoverUnderline,
                        width: hoveredButton === item.name ? '100%' : '0%',
                      }} 
                    />
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
          
          {/* Animated gradient line */}
          <Box sx={styles.gradientLine} />
        </AppBar>
      </Slide>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: '85px' }} />

      {/* Scroll to Top Button */}
      <ScrollTop />

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  appbar: {
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    height: "85px",
    justifyContent: "center",
    zIndex: 1100,
    border: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: { xs: 2, sm: 3, md: 4 },
    minHeight: '85px !important',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    animation: 'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    '@keyframes slideInLeft': {
      '0%': {
        transform: 'translateX(-50px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
  },

  logoIconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.05)',
      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.45)',
      '& .MuiSvgIcon-root': {
        transform: 'rotate(360deg)',
      },
    },
  },

  logoIcon: {
    fontSize: '28px',
    color: '#ffffff',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  logoGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    opacity: 0,
    filter: 'blur(8px)',
    transition: 'opacity 0.4s ease',
    zIndex: -1,
    '&:hover': {
      opacity: 0.6,
    },
  },

  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontWeight: 700,
    fontFamily: "Montserrat, Inter, sans-serif",
    color: '#1a202c',
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    fontSize: '1.8rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  subtitle: {
    fontFamily: "Inter, sans-serif",
    color: '#64748b',
    fontWeight: 500,
    fontSize: '0.8rem',
    letterSpacing: "0.03em",
    marginTop: '-2px',
    opacity: 0.8,
  },

  linkContainer: {
    display: "flex",
    gap: 2,
    alignItems: 'center',
    animation: 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    '@keyframes slideInRight': {
      '0%': {
        transform: 'translateX(50px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
  },

  linkButton: {
    position: 'relative',
    color: "#2d3748",
    fontWeight: 600,
    fontSize: "1.1rem",
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.02em",
    padding: "12px 24px",
    textTransform: "none",
    borderRadius: "12px",
    minWidth: 'auto',
    overflow: 'hidden',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    animation: 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
    opacity: 0,
    transform: 'translateY(20px)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
      transition: 'left 0.6s ease',
    },
    "&:hover": {
      backgroundColor: "rgba(102, 126, 234, 0.08)",
      color: "#4c51bf",
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
      '&:before': {
        left: '100%',
      },
    },
    "&:active": {
      transform: "translateY(-1px) scale(0.98)",
    },
    '@keyframes fadeInUp': {
      'to': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },

  buttonText: {
    fontWeight: 700,
    fontSize: '1.1rem',
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: '0.02em',
    textTransform: 'none',
    position: 'relative',
    zIndex: 1,
  },

  hoverUnderline: {
    position: 'absolute',
    bottom: '8px',
    left: '50%',
    height: '3px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    borderRadius: '2px',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  gradientLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)',
    backgroundSize: '300% 100%',
    animation: 'gradientShift 4s ease-in-out infinite',
    '@keyframes gradientShift': {
      '0%, 100%': {
        backgroundPosition: '0 0',
      },
      '50%': {
        backgroundPosition: '100% 0',
      },
    },
  },

  scrollTop: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
      transform: 'scale(1.15) translateY(-2px)',
      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.45)',
    },
  },
};

export default Navbar;