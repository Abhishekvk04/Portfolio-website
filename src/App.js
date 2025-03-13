import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import profilePhoto from './Assests/abhi.png';
import { IconButton, Button, Card, CardContent, Typography, Fab, TextField, Grid, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Route, Routes, Link, NavLink as RouterNavLink } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Analytics } from "@vercel/analytics/react";

// Lazy load components
const Projects = lazy(() => import('./Components/Projects'));

// NavLink Component
const NavLink = ({ to, children, theme }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) => `
      px-3 py-2 rounded-lg font-medium transition-all duration-300
      ${theme === 'dark' 
        ? `${isActive ? 'bg-cyan-900/30 text-cyan-400' : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'}`
        : `${isActive ? 'bg-cyan-100 text-cyan-700' : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-200/50'}`
      }
    `}
  >
    {children}
  </RouterNavLink>
);

// Animated Button Component
const AnimatedButton = React.memo(({ children, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

// ScrollReveal Component
const ScrollRevealSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

// SkillBar Component
const SkillBar = React.memo(({ skill, level, color = '#66fcf1', icon }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className="mb-4 p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(102, 252, 241, 0.15)" }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <Typography variant="code" className="font-code text-gray-200 text-sm">{skill}</Typography>
        </div>
        <span className="font-code text-cyan-400 text-xs font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            background: `linear-gradient(90deg, ${color} 0%, rgba(102, 252, 241, 0.7) 100%)` 
          }}
        />
      </div>
    </motion.div>
  );
});

// ExperienceCard Component
const ExperienceCard = React.memo(({ title, role, location, duration, points, logo, color }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className="p-5 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 border-l-4 mb-4 transition-all duration-300"
      style={{ borderLeftColor: color }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(102, 252, 241, 0.15)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: `${color}30` }}>
          {logo}
        </div>
        <div>
          <h4 className="font-code text-cyan-400 text-lg m-0">{title}</h4>
          <p className="text-gray-300 font-code text-sm my-0">{role}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs bg-gray-700/50 text-cyan-300 px-2 py-1 rounded-full">{location}</span>
        <span className="text-xs bg-gray-700/50 text-cyan-300 px-2 py-1 rounded-full">{duration}</span>
      </div>
      <motion.ul 
        className="list-none pl-0 mt-3 space-y-2"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {points.map((point, index) => (
          <motion.li 
            key={index}
            className="text-gray-300 text-sm pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-cyan-500 before:font-code"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            {point}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
});

// SkillsAndExperience Component
const SkillsAndExperience = ({ theme }) => {
  const skills = [
    { name: 'Python', level: 90, color: '#3776AB', icon: '🐍' },
    { name: 'Java', level: 80, color: '#007396', icon: '☕' },
    { name: 'C', level: 75, color: '#A8B9CC', icon: '©️' },
    { name: 'HTML', level: 95, color: '#E34F26', icon: '🌐' },
    { name: 'CSS', level: 90, color: '#1572B6', icon: '🎨' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E', icon: '⚡' },
    { name: 'Flutter', level: 80, color: '#02569B', icon: '📱' }
  ];

  const experiences = [
    {
      title: 'IEEE RIT-B',
      role: 'Web Resource Execom Member',
      location: 'Bangalore, India, Hybrid',
      duration: 'Jan 2024 – Present',
      logo: '🌐',
      color: '#00629B',
      points: ['Led a team in maintaining the IEEE RIT-B website, ensuring seamless user experience and functionality.']
    },
    {
      title: 'GirlScript Summer of Code',
      role: 'Open Source Contributor',
      location: 'India, Remote',
      duration: 'May 2023 – Aug 2023',
      logo: '👩‍💻',
      color: '#F64A8A',
      points: [
        'Ranked 331 in quine.',
        'Contributed to the UI by writing media queries for the ISKCON-based project Moksh to make it responsive.'
      ]
    }
  ];

  return (
    <Grid container spacing={4} className="w-full">
      <Grid item xs={12} md={6}>
        <ScrollRevealSection>
          <Card className={`
            rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-cyan-400/10 shadow-cyan-900/20' 
              : 'bg-gradient-to-r from-white to-gray-100 border border-cyan-400/5 shadow-gray-400/10'
            }
          `}>
            <CardContent>
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br from-cyan-500 to-cyan-400 text-white"
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CodeIcon />
                </motion.div>
                <Typography variant="h5" className={`font-code ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  Technical Skills
                </Typography>
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex flex-col gap-4"
              >
                {skills.map((skill, index) => (
                  <SkillBar key={index} skill={skill.name} level={skill.level} color={skill.color} icon={skill.icon} />
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </ScrollRevealSection>
      </Grid>

      <Grid item xs={12} md={6}>
        <ScrollRevealSection>
          <Card className={`
            rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-cyan-400/10 shadow-cyan-900/20' 
              : 'bg-gradient-to-r from-white to-gray-100 border border-cyan-400/5 shadow-gray-400/10'
            }
          `}>
            <CardContent>
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br from-cyan-500 to-cyan-400 text-white"
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <WorkIcon />
                </motion.div>
                <Typography variant="h5" className={`font-code ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  Experience
                </Typography>
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                className="flex flex-col gap-6"
              >
                {experiences.map((exp, index) => (
                  <ExperienceCard key={index} {...exp} />
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </ScrollRevealSection>
      </Grid>
    </Grid>
  );
};

// AboutMe Component
const AboutMe = ({ theme }) => {
  return (
    <ScrollRevealSection>
      <Card className={`
        rounded-xl overflow-hidden shadow-lg
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-cyan-400/10 shadow-cyan-900/20' 
          : 'bg-gradient-to-r from-white to-gray-100 border border-cyan-400/5 shadow-gray-400/10'
        }
      `}>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Left side - Bio */}
            <div className="md:col-span-2 p-6 md:p-8">
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br from-cyan-500 to-cyan-400 text-white"
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <SchoolIcon />
                </motion.div>
                <Typography variant="h5" className={`font-code ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  About Me
                </Typography>
              </div>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  I'm a <span className={`font-semibold ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>Data Science and AI student</span> with a passion for creating innovative digital experiences. My journey in tech has equipped me with a strong foundation in:
                </p>
                
                <div className="grid grid-cols-2 gap-3 my-4">
                  {[
                    { icon: "💻", text: "Web Development" },
                    { icon: "🤖", text: "AI Applications" },
                    { icon: "📊", text: "Data Analysis" },
                    { icon: "📱", text: "Mobile Development" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`flex items-center p-3 rounded-lg ${
                        theme === 'dark' 
                          ? 'bg-gray-800/50 hover:bg-gray-800/70' 
                          : 'bg-white hover:bg-gray-100 shadow-sm'
                      } transition-all duration-300`}
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    >
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  I've led projects that enhance user experience and contributed to award-winning solutions. My goal is to leverage my skills in a dynamic organization where I can continue to grow and make an impact.
                </p>
              </motion.div>
            </div>
            
            {/* Right side - Stats/Highlights */}
            <div className={`p-6 md:p-8 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    Education
                  </h4>
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800/70' : 'bg-white shadow-sm'
                  }`}>
                                        <p className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      B.Tech in Data Science & AI
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Ramaiah Institute of Technology, Bangalore
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        2022 - 2026
                      </span>
                      <div className="h-2 w-1/2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Machine Learning', 'Web Development', 'UI/UX Design', 'Data Visualization', 'Mobile Apps'].map((interest, index) => (
                      <motion.span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          theme === 'dark' 
                            ? 'bg-gray-800 text-cyan-400 border border-cyan-400/20' 
                            : 'bg-white text-cyan-600 border border-cyan-400/30 shadow-sm'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                        whileHover={{ scale: 1.05, backgroundColor: theme === 'dark' ? 'rgba(8, 145, 178, 0.2)' : 'rgba(8, 145, 178, 0.1)' }}
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollRevealSection>
  );
};

// Section Component
const Section = ({ id, title, children, theme }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className="my-8"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`
        rounded-2xl mb-10 p-5 shadow-lg transition-all duration-400 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 shadow-cyan-900/20' 
          : 'bg-gradient-to-r from-white to-gray-100 shadow-gray-400/10'
        }
      `}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
            >
              {title}
            </motion.span>
          </Typography>
          <div className="text-left">{children}</div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

// ParallaxBackground Component
const ParallaxBackground = ({ theme }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <motion.div 
      className="fixed inset-0 z-[-1]"
      style={{ y }}
    >
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-[radial-gradient(circle,rgba(102,252,241,0.1)_1px,transparent_1px)]' 
          : 'bg-[radial-gradient(circle,rgba(8,145,178,0.1)_1px,transparent_1px)]'
      } bg-[length:20px_20px]`}></div>
    </motion.div>
  );
};

// Main App Component
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedText, setAnimatedText] = useState('');
  const [isFullStack, setIsFullStack] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const texts = ['Hey There! This is Abhishek V K', 'Full Stack Developer', 'Proud Indian Programmer'];
    let currentText = '';
    let currentIndex = 0;
    let currentLetterIndex = 0;
    let isDeleting = false;
    let timeoutId = null;
  
    const typeText = () => {
      // Set which text to display and update isFullStack state
      if (currentLetterIndex === 0 && !isDeleting) {
        currentText = texts[currentIndex];
        setIsFullStack(currentIndex === 1);
      }
  
      // Typing effect
      if (!isDeleting) {
        setAnimatedText(currentText.slice(0, currentLetterIndex + 1));
        currentLetterIndex++;
        
        // If we've typed the full text, pause then start deleting
        if (currentLetterIndex > currentText.length) {
          isDeleting = false;
          timeoutId = setTimeout(() => {
            currentLetterIndex = 0;
            currentIndex = (currentIndex + 1) % texts.length;
          }, 1000); // Pause at the end of each text
        }
      }
    };
  
    const interval = setInterval(typeText, 100);
    
    // Clean up function
    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value.toLowerCase());
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme;
  }, [theme]);

  const sections = [
    { title: 'About Me', id: 'about-me' },
    { title: 'Technical Skills & Experience', id: 'skills-and-experience' },
  ];
  
  const getSectionContent = (id) => {
    switch (id) {
      case 'about-me':
        return <AboutMe theme={theme} />;
      case 'skills-and-experience':
        return <SkillsAndExperience theme={theme} />;
      default:
        return null;
    }
  };
  
  return (
    <Router>
      <motion.div
        className={`min-h-screen ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-gray-900 to-gray-950 text-gray-100' 
            : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ParallaxBackground theme={theme} />
        
        {/* Theme toggle button */}
  <motion.div 
  className="fixed top-4 right-4 z-50"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  <IconButton 
    onClick={toggleTheme} 
    className={`rounded-full p-2 transition-all duration-300 ${
      theme === 'dark' 
        ? 'text-yellow-400 bg-gray-900 border-2 border-yellow-400' 
        : 'text-gray-800 bg-yellow-100'
    }`}
    sx={{ 
      boxShadow: theme === 'dark' ? '0 0 15px rgba(250, 204, 21, 0.5)' : 'none',
      '&:hover': {
        backgroundColor: theme === 'dark' ? 'rgba(250, 204, 21, 0.2)' : '#f5f5f5'
      }
    }}
  >
    {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
  </IconButton>
</motion.div>



        {/* Header content */}
        <header className="py-8 px-4">
          <nav className={`flex flex-col md:flex-row justify-between items-center p-4 mb-8 rounded-xl shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-800/60 backdrop-blur-md border border-cyan-900/30' 
              : 'bg-white/80 backdrop-blur-md border border-gray-200 shadow-gray-200/50'
          }`}>
            <motion.div
              className="mb-4 md:mb-0"
              animate={{ 
                color: isFullStack 
                  ? theme === 'dark' ? '#66fcf1' : '#0891b2'
                  : theme === 'dark' ? '#ffffff' : '#1e293b',
                textShadow: isFullStack ? '0 0 8px rgba(102, 252, 241, 0.6)' : 'none'
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-2xl md:text-3xl font-bold"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              >
                {animatedText}
              </motion.h1>
            </motion.div>
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-2 md:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="text" 
                  className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-500'
                  }`}
                  component={Link} 
                  to="/"
                >
                  Home
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="text" 
                  className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-500'
                  }`}
                  component={Link} 
                  to="/projects"
                >
                  Projects
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  className={`${
                    theme === 'dark' 
                      ? 'bg-cyan-700 hover:bg-cyan-600 text-white' 
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                  href="https://drive.google.com/file/d/1tFKzuLA0SEMP8TVbkhYwiUPO9YCaZdDP/view?usp=sharing"
                  target="_blank"
                >
                  Resume
                </Button>
              </motion.div>
              <TextField
                label="Search"
                variant="outlined"
                onChange={handleSearchChange}
                size="small"
                className="ml-4"
                InputProps={{
                  className: theme === 'dark' ? "text-gray-200" : "text-gray-700",
                  style: { borderRadius: '15px' }
                }}
                InputLabelProps={{
                  className: theme === 'dark' ? "text-gray-400" : "text-gray-500"
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { 
                      borderColor: theme === 'dark' ? 'rgba(102, 252, 241, 0.3)' : 'rgba(8, 145, 178, 0.3)',
                      borderRadius: '15px'
                    },
                    '&:hover fieldset': { 
                      borderColor: theme === 'dark' ? 'rgba(102, 252, 241, 0.7)' : 'rgba(8, 145, 178, 0.5)' 
                    },
                    '&.Mui-focused fieldset': { 
                      borderColor: theme === 'dark' ? '#66fcf1' : '#0891b2' 
                    },
                  },
                }}
              />
            </motion.div>
          </nav>
          <motion.img
            src={profilePhoto}
            className={`w-48 h-48 md:w-52 md:h-52 rounded-full mx-auto my-8 object-cover ${
              theme === 'dark' 
                ? 'shadow-lg shadow-cyan-500/30' 
                : 'shadow-lg shadow-cyan-500/20 border-4 border-white'
            }`}
            alt="Profile"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: theme === 'dark' 
                ? "0px 0px 20px rgba(102, 252, 241, 0.7)" 
                : "0px 0px 20px rgba(8, 145, 178, 0.4)" 
            }}
          />
          <motion.div 
          className="flex justify-center items-center gap-4 my-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <IconButton 
              href="https://github.com/Abhishekvk04" 
              target="_blank"
              className={`${
                theme === 'dark' 
                  ? 'text-cyan-400 bg-gray-800/70 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-400 hover:text-gray-900' 
                  : 'text-cyan-600 bg-gray-100/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-400 hover:text-white shadow-sm'
              } transition-all duration-300 p-2.5 rounded-full`}
              sx={{ boxShadow: theme === 'dark' ? '0 0 10px rgba(8, 145, 178, 0.2)' : '0 0 10px rgba(8, 145, 178, 0.1)' }}
            >
              <GitHubIcon />
            </IconButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
            <IconButton 
              href="https://www.linkedin.com/in/abhishek-v-k-574846248/" 
              target="_blank"
              className={`${
                theme === 'dark' 
                  ? 'text-blue-400 bg-gray-800/70 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 hover:text-gray-900' 
                  : 'text-blue-600 bg-gray-100/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 hover:text-white shadow-sm'
              } transition-all duration-300 p-2.5 rounded-full`}
              sx={{ boxShadow: theme === 'dark' ? '0 0 10px rgba(59, 130, 246, 0.2)' : '0 0 10px rgba(59, 130, 246, 0.1)' }}
            >
              <LinkedInIcon />
            </IconButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <IconButton 
              href="mailto:vkabhishek04@gmail.com"
              className={`${
                theme === 'dark' 
                  ? 'text-amber-400 bg-gray-800/70 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-400 hover:text-gray-900' 
                  : 'text-amber-600 bg-gray-100/80 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-400 hover:text-white shadow-sm'
              } transition-all duration-300 p-2.5 rounded-full`}
              sx={{ boxShadow: theme === 'dark' ? '0 0 10px rgba(251, 191, 36, 0.2)' : '0 0 10px rgba(251, 191, 36, 0.1)' }}
            >
              <EmailIcon />
            </IconButton>
          </motion.div>
        </motion.div>

        </header>

        {/* Main content */}
        <main className="container mx-auto px-4">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div className="text-center py-8 text-cyan-400">Loading...</div>}>
                  {sections
                    .filter((section) => section.title.toLowerCase().includes(searchQuery))
                    .map((section) => (
                      <Section key={section.id} id={section.id} title={section.title} theme={theme}>
                        {getSectionContent(section.id)}
                      </Section>
                    ))}
                </Suspense>
              }
            />
            <Route 
              path="/projects" 
              element={
                <Suspense fallback={<div className="text-center py-8 text-cyan-400">Loading...</div>}>
                  <Projects />
                </Suspense>
              } 
            />
          </Routes>
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Fab 
              color="primary" 
              aria-label="back to top" 
              className={`${
                theme === 'dark' 
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                  : 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-md shadow-cyan-500/20'
              }`}
              onClick={handleBackToTop}
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUpwardIcon />
            </Fab>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className={`py-8 w-full mt-12 border-t ${
          theme === 'dark' 
            ? 'bg-gray-900/90 border-cyan-400/30' 
            : 'bg-gray-100/90 border-cyan-600/20'
        }`}>
          <motion.div 
            className={`max-w-3xl mx-auto text-center text-sm px-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>&copy; 2025 Abhishek V K</p>
            <p className="my-2">
              Email: <a href="mailto:vkabhishek04@gmail.com" className={`${
                theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-500'
              } hover:underline transition-colors duration-300`}>vkabhishek04@gmail.com</a>
            </p>
            <p className="flex flex-wrap justify-center gap-2">
              GitHub: <a href="https://github.com/Abhishekvk04" target="_blank" rel="noopener noreferrer" className={`${
                theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-500'
              } hover:underline transition-colors duration-300`}>Abhishekvk04</a> |
              LinkedIn: <a href="https://www.linkedin.com/in/abhishek-v-k-574846248/" target="_blank" rel="noopener noreferrer" className={`${
                theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-500'
              } hover:underline transition-colors duration-300`}>Abhishek V K</a>
            </p>
          </motion.div>
        </footer>
      </motion.div>
      <Analytics/>
    </Router>
  );
}

export default App;


