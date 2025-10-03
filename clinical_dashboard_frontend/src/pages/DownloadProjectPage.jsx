import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';

const DownloadProjectPage = () => {
  // Customizable transparency for floating icons (0.1 = 10% opacity, 0.3 = 30% opacity)
  const floatingIconsOpacity = 0.15; // 🔧 CHANGE THIS VALUE TO ADJUST TRANSPARENCY

  const socialIcons = ['💼', '💻', '📺', '🔗', '👥', '🚀', '⭐', '📊', '📈', '🎯', '🤝', '🌟', '🔥', '💫', '🎨'];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Enhanced Header with Green Theme */}
      <Box sx={{ 
        mb: 6,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Particles */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6
        }}>
          {/* Download & Project Icons */}
          {['📥', '💼', '🚀', '📊', '⭐', '🔗', '📁'].map((icon, index) => (
            <Box key={index} sx={{
              position: 'absolute',
              fontSize: '24px',
              top: `${10 + index * 10}%`,
              left: `${5 + index * 12}%`,
              animation: 'float 8s ease-in-out infinite',
              animationDelay: `${index * 0.7}s`,
              opacity: 0.7
            }}>
              {icon}
            </Box>
          ))}
          
          {/* Floating Circles */}
          {['#00f5d4', '#00bbf9', '#9b5de5', '#f15bb5', '#10b981', '#84cc16'].map((color, index) => (
            <Box key={index} sx={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              background: color,
              borderRadius: '50%',
              top: `${20 + index * 8}%`,
              right: `${5 + index * 10}%`,
              animation: 'float 6s ease-in-out infinite',
              animationDelay: `${index * 0.5}s`,
              filter: 'blur(1px)',
              opacity: 0.4
            }} />
          ))}
        </Box>

        {/* Additional Floating Elements */}
        <Box sx={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          zIndex: 0,
          animation: 'float 10s ease-in-out infinite'
        }}>
          <Typography variant="h4" sx={{ opacity: 0.3 }}>
            📁
          </Typography>
        </Box>

        {/* Global Styles for Animations */}
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
            }
          `}
        </style>
      </Box>

      {/* Main Download Section - Centered with Glass Effect */}
      <Grid container justifyContent="center" sx={{ mb: 6 }}>
        <Grid item xs={12} lg={10} xl={8}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{
              textAlign: 'center',
              p: 5,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '24px',
              boxShadow: `
                0 8px 32px rgba(16, 185, 129, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.6),
                inset 0 -1px 0 rgba(255, 255, 255, 0.2)
              `,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Animated Background Effect */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
                zIndex: 0
              }} />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" sx={{ 
                  color: '#1e3a2f',
                  fontWeight: '700',
                  mb: 4,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  🎯 Complete Project Report
                </Typography>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component="a"
                    href="https://drive.google.com/file/d/1RPxI0-mNkbNtbVeioWVJDUn13HumAFvf/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    sx={{
                      py: 3,
                      px: 8,
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.4)',
                      borderRadius: '50px',
                      boxShadow: `
                        0 8px 32px rgba(16, 185, 129, 0.4),
                        0 4px 16px rgba(255, 255, 255, 0.2) inset
                      `,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        boxShadow: `
                          0 12px 40px rgba(16, 185, 129, 0.6),
                          0 4px 16px rgba(255, 255, 255, 0.3) inset
                        `,
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease',
                      animation: 'pulse 2s infinite',
                      minWidth: '320px'
                    }}
                  >
                    📥 Download Project Report
                  </Button>
                </motion.div>
                
                <Typography variant="h6" sx={{ 
                  mt: 4, 
                  color: '#1e3a2f',
                  fontWeight: 500,
                  fontSize: '1.2rem',
                  opacity: 0.9
                }}>
                  
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      {/* Connect Section - Same Width as Above with Floating Icons */}
      <Grid container justifyContent="center" sx={{ mb: 6 }}>
        <Grid item xs={12} lg={10} xl={8}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Box sx={{
              textAlign: 'center',
              p: 5,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '24px',
              boxShadow: `
                0 8px 32px rgba(16, 185, 129, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.6),
                inset 0 -1px 0 rgba(255, 255, 255, 0.2)
              `,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background Gradient */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
                zIndex: 0
              }} />

              {/* 🔥 FLOATING SOCIAL ICONS BACKGROUND */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 0,
                opacity: floatingIconsOpacity // 🔧 THIS CONTROLS TRANSPARENCY
              }}>
                {socialIcons.map((icon, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'absolute',
                      fontSize: '32px',
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                      animation: `floatSocial ${8 + Math.random() * 4}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 5}s`,
                      transform: `scale(${0.8 + Math.random() * 0.4})`,
                      filter: 'blur(0.5px)'
                    }}
                  >
                    {icon}
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" sx={{ 
                  color: '#1e3a2f',
                  fontWeight: '700',
                  mb: 3,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  🤝 Connect For More Projects
                </Typography>
                
                <Typography variant="h6" sx={{ 
                  color: '#2d5a4b',
                  fontWeight: '400',
                  lineHeight: 1.7,
                  mb: 5,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  px: { md: 4 }
                }}>
                  Thank you for exploring my work! Connect with me for collaboration, 
                  hiring opportunities or to discuss data projects.
                </Typography>

                {/* Social Links - Enhanced */}
                <Grid container spacing={3} justifyContent="center">
                  {/* LinkedIn */}
                  <Grid item xs={12} md={4}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        component="a"
                        href="https://www.linkedin.com/in/datawithbiswajeet/"
                        target="_blank"
                        variant="outlined"
                        sx={{
                          width: '100%',
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          border: '2px solid #0a66c2',
                          color: '#0a66c2',
                          borderRadius: '16px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          '&:hover': {
                            borderColor: '#004182',
                            backgroundColor: 'rgba(10, 102, 194, 0.1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(10, 102, 194, 0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        💼 Connect on LinkedIn
                      </Button>
                    </motion.div>
                  </Grid>

                  {/* GitHub */}
                  <Grid item xs={12} md={4}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        component="a"
                        href="https://github.com/datawithbiswajeet"
                        target="_blank"
                        variant="outlined"
                        sx={{
                          width: '100%',
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          border: '2px solid #24292e',
                          color: '#24292e',
                          borderRadius: '16px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          '&:hover': {
                            borderColor: '#000000',
                            backgroundColor: 'rgba(36, 41, 46, 0.1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(36, 41, 46, 0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        💻 Follow on GitHub
                      </Button>
                    </motion.div>
                  </Grid>

                  {/* YouTube */}
                  <Grid item xs={12} md={4}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        component="a"
                        href="https://www.youtube.com/@datawithbiswajeet"
                        target="_blank"
                        variant="outlined"
                        sx={{
                          width: '100%',
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          border: '2px solid #ff0000',
                          color: '#ff0000',
                          borderRadius: '16px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          '&:hover': {
                            borderColor: '#cc0000',
                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(255, 0, 0, 0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        📺 Subscribe on YouTube
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      {/* Email Contact - Same Width as Above */}
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={10} xl={8}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Box sx={{
              textAlign: 'center',
              p: 5,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '24px',
              boxShadow: `
                0 8px 32px rgba(16, 185, 129, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.6),
                inset 0 -1px 0 rgba(255, 255, 255, 0.2)
              `,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background Gradient */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(245, 158, 11, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
                zIndex: 0
              }} />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" sx={{ 
                  color: '#1e3a2f',
                  fontWeight: '700',
                  mb: 3,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  📧 Get In Touch
                </Typography>
                
                <Typography variant="h4" sx={{ 
                  color: '#10b981',
                  fontWeight: '600',
                  fontSize: '1.5rem',
                  mb: 4,
                  wordBreak: 'break-all',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  datawithbiswajeet@gmail.com
                </Typography>
                
                <Typography variant="body1" sx={{ 
                  color: '#2d5a4b',
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  mb: 4,
                  px: { md: 4 }
                }}>
                  Ready to start your next data project?
                  Let's connect and explore how we can transform your data into actionable insights that drive real business impact.

                  I'm also passionate about contributing to society so if you have projects related to community development and upliftment, I'd be glad to support them pro bono with my skills and efforts.
                </Typography>

                {/* Call to Action Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component="a"
                    href="mailto:datawithbiswajeet@gmail.com"
                    variant="contained"
                    sx={{
                      py: 2,
                      px: 6,
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.4)',
                      borderRadius: '16px',
                      boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)',
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                        boxShadow: '0 12px 25px rgba(245, 158, 11, 0.6)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ✉️ Send Email
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      {/* Additional Animation Styles */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes floatSocial {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg) scale(var(--scale, 1)); 
            }
            33% { 
              transform: translateY(-15px) translateX(10px) rotate(3deg) scale(var(--scale, 1)); 
            }
            66% { 
              transform: translateY(10px) translateX(-5px) rotate(-2deg) scale(var(--scale, 1)); 
            }
          }
        `}
      </style>
    </Container>
  );
};

export default DownloadProjectPage;