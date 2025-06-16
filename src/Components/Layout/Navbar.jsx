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
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Home', path: '/', action: () => navigate('/') },
    { name: 'Login', path: '/login', action: () => navigate('/login') },
    { name: 'Feedback', path: '/feedback', action: () => navigate('/feedback') },
    { name: 'Contact Us', path: '/contact', action: () => navigate('/contact') },
  ];

  const handleMobileNavClick = (action) => {
    action();
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={styles.drawer}>
      <Box sx={styles.drawerHeader}>
        <IconButton onClick={handleDrawerToggle} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={styles.drawerList}>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            onClick={() => handleMobileNavClick(item.action)}
            sx={styles.drawerListItem}
          >
            <ListItemText 
              primary={item.name} 
              sx={styles.drawerListItemText}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

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

              {/* Mobile menu button */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={styles.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Desktop Navigation Links */}
              {!isMobile && (
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
              )}
            </Toolbar>
          </Container>
          
          {/* Animated gradient line */}
          <Box sx={styles.gradientLine} />
        </AppBar>
      </Slide>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={styles.drawerContainer}
      >
        {drawer}
      </Drawer>

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
    gap: { xs: 1.5, sm: 2, md: 3 },
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
    width: { xs: '40px', sm: '48px', md: '56px' },
    height: { xs: '40px', sm: '48px', md: '56px' },
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
    fontSize: { xs: '20px', sm: '24px', md: '28px' },
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
    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
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
    fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
    letterSpacing: "0.03em",
    marginTop: '-2px',
    opacity: 0.8,
    display: { xs: 'none', sm: 'block' },
  },

  linkContainer: {
    display: "flex",
    gap: { md: 1, lg: 2 },
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
    fontSize: { md: "1rem", lg: "1.1rem" },
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.02em",
    padding: { md: "10px 16px", lg: "12px 24px" },
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
    fontSize: { md: '1rem', lg: '1.1rem' },
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

  menuButton: {
    color: '#2d3748',
    '&:hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.08)',
    },
  },

  drawerContainer: {
    '& .MuiDrawer-paper': {
      width: { xs: '280px', sm: '320px' },
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    },
  },

  drawer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '16px',
    minHeight: '64px',
  },

  closeButton: {
    color: '#2d3748',
    '&:hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.08)',
    },
  },

  drawerList: {
    flex: 1,
    paddingTop: 0,
  },

  drawerListItem: {
    cursor: 'pointer',
    borderRadius: '12px',
    margin: '8px 16px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.08)',
      transform: 'translateX(8px)',
    },
  },

  drawerListItemText: {
    '& .MuiListItemText-primary': {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
      fontSize: '1.1rem',
      color: '#2d3748',
      letterSpacing: '0.02em',
    },
  },
};

export default Navbar;