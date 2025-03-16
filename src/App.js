//App.js
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
import Projects, { projects } from './Components/Projects';


// Lazy load components
//const Projects = lazy(() => import('./Components/Projects'));

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
const SkillBar = React.memo(({ skill, level, color = '#66fcf1', icon, theme }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className={`mb-4 p-3 rounded-lg ${
        theme === 'dark' 
          ? 'bg-gray-800/40 hover:bg-gray-800/60' 
          : 'bg-white/80 hover:bg-white'
      } transition-all duration-300`}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-xl ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>{icon}</span>
          <Typography variant="code" className={`font-code text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{skill}</Typography>
        </div>
        <span className={`font-code text-xs font-semibold ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>{level}%</span>
      </div>
      <div className={`h-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
        <motion.div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            background: theme === 'dark' 
              ? `linear-gradient(90deg, ${color} 0%, rgba(102, 252, 241, 0.7) 100%)`
              : `linear-gradient(90deg, ${color} 0%, rgba(8, 145, 178, 0.7) 100%)`
          }}
        />
      </div>
    </motion.div>
  );
});

// ExperienceCard Component
const ExperienceCard = React.memo(({ title, role, location, duration, points, logo, color, theme }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className={`p-5 rounded-lg border-l-4 mb-4 transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-800/40 hover:bg-gray-800/60' 
          : 'bg-white/80 hover:bg-white shadow-sm'
      }`}
      style={{ borderLeftColor: color }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
          theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
        }`} style={{ backgroundColor: theme === 'dark' ? `${color}30` : `${color}15` }}>
          {logo}
        </div>
        <div>
          <h4 className={`font-code text-lg m-0 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>{title}</h4>
          <p className={`font-code text-sm my-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{role}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${
          theme === 'dark' 
            ? 'bg-gray-700/50 text-cyan-300' 
            : 'bg-gray-200/70 text-cyan-700'
        }`}>{location}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          theme === 'dark' 
            ? 'bg-gray-700/50 text-cyan-300' 
            : 'bg-gray-200/70 text-cyan-700'
        }`}>{duration}</span>
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
            className={`text-sm pl-4 relative before:content-['>'] before:absolute before:left-0 ${
              theme === 'dark' 
                ? 'text-gray-300 before:text-cyan-500' 
                : 'text-gray-700 before:text-cyan-600'
            } before:font-code`}
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

  const experiences = [
    {
      title: 'Fintervue',
      role: 'Full Stack Developer Intern',
      location: 'Remote',
      duration: 'Jul 2024 – Dec 2024',
      logo: '💼',
      color: '#00629B',
      points: [
        'Enhanced Fintervue\'s UI using React.js, Tailwind CSS, and Vite, resulting in a 20% increase in user engagement.',
        'Streamlined API integration with cross-functional teams, reducing API latency by 15% and improving platform scalability.',
        'Managed the crucial deployment process, ensuring 99% uptime during critical product launch phases using CI/CD best practices.',
        'Improved financial interview/job search features, resulting in a 15% increase in daily active users by applying data-driven strategies.'
      ],
      skills: ['React.js', 'Tailwind CSS', 'Vite', 'CI/CD', 'API Integration'],
      metrics: [
        { value: '20%', label: 'Engagement Increase' },
        { value: '15%', label: 'API Latency Reduction' },
        { value: '99%', label: 'Uptime' },
        { value: '15%', label: 'User Growth' }
      ]
    },
    {
      title: 'IEEE RIT-B',
      role: 'Web Resource Co-Head',
      location: 'Bangalore, India, Hybrid',
      duration: 'Jan 2024 – Present',
      logo: '🌐',
      color: '#00629B',
      points: [
        'Promoted from Execom Member to Co-Head position, leading the web development team for the IEEE RIT-B chapter.',
        'Led a team in maintaining and enhancing the IEEE RIT-B website, resulting in improved user experience and 25% increased visitor engagement.',
        'Implemented responsive design principles and optimized site performance, reducing load times by 30% and improving mobile usability.',
        'Collaborated with cross-functional teams to integrate event management features and content updates for technical workshops and conferences.'
      ],
      skills: ['NextJS', 'ReactJS', 'TailwindCSS', 'UI/UX', 'Team Leadership'],
      metrics: [
        { value: '30%', label: 'Performance Improvement' },
        { value: '25%', label: 'Engagement Increase' }
      ]
    },
    {
      title: 'GirlScript Summer of Code',
      role: 'Open Source Contributor',
      location: 'India, Remote',
      duration: 'May 2023 – Aug 2023',
      logo: '👩‍💻',
      color: '#F64A8A',
      points: [
        'Ranked 331 out of 5000+ participants in Quine, demonstrating strong problem-solving and coding skills in a competitive environment.',
        'Contributed to the ISKCON-based project Moksh by implementing responsive design with media queries, ensuring seamless experience across all device sizes.',
        'Collaborated with global contributors using Git workflow, participating in code reviews and addressing accessibility concerns.'
      ],
      skills: ['Open Source', 'Responsive Design', 'Git', 'HTML/CSS', 'JavaScript'],
      metrics: [
        { value: 'Top 7%', label: 'Participant Ranking' }
      ]
    }
  ];

  return (
    <Grid container spacing={4} className="w-full">
      <Grid item xs={12} md={6}>
  <Card className={`
    rounded-xl overflow-hidden shadow-lg
    ${theme === 'dark' 
      ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-amber-400/10 shadow-amber-900/20' 
      : 'bg-gradient-to-r from-white to-gray-100 border border-cyan-400/5 shadow-gray-400/10'
    }
  `}>
    <CardContent>
      <div className="flex items-center mb-6">
        <motion.div
          className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-amber-500 to-amber-400 text-gray-900' 
              : 'bg-gradient-to-br from-cyan-600 to-cyan-500 text-white'
          }`}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CodeIcon />
        </motion.div>
        <Typography variant="h5" className={`font-code ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>
          Technical Skills
        </Typography>
      </div>
      
      {/* Skill Categories */}
      <div className="space-y-6">
        {/* Languages Category */}
        <div>
          <h3 className={`text-sm uppercase font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Programming Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Python', icon: '🐍', level: 90, color: '#3776AB' },
              { name: 'Java', icon: '☕', level: 80, color: '#007396' },
              { name: 'C', icon: '©️', level: 75, color: '#A8B9CC' },
              { name: 'R', icon: 'R', level: 70, color: '#276DC3' }
            ].map((skill, index) => (
              <motion.div
                key={index}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/70 hover:bg-gray-800' 
                    : 'bg-white hover:bg-gray-50 shadow-sm'
                } transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className={`text-lg ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>{skill.icon}</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{skill.name}</span>
                <div className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                  theme === 'dark' 
                    ? 'bg-amber-400/20 text-amber-300' 
                    : 'bg-cyan-100 text-cyan-700'
                }`}>{skill.level}%</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Web Development Category */}
        <div>
          <h3 className={`text-sm uppercase font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Web & App Development
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'ReactJS', icon: '⚛️', level: 85, color: '#61DAFB' },
              { name: 'HTML/CSS', icon: '🌐', level: 90, color: '#E34F26' },
              { name: 'JavaScript', icon: '⚡', level: 85, color: '#F7DF1E' },
              { name: 'Flutter', icon: '📱', level: 80, color: '#02569B' }
            ].map((skill, index) => (
              <motion.div
                key={index}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/70 hover:bg-gray-800' 
                    : 'bg-white hover:bg-gray-50 shadow-sm'
                } transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.05) }}
              >
                <span className={`text-lg ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>{skill.icon}</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{skill.name}</span>
                <div className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                  theme === 'dark' 
                    ? 'bg-amber-400/20 text-amber-300' 
                    : 'bg-cyan-100 text-cyan-700'
                }`}>{skill.level}%</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Data Science Category */}
        <div>
          <h3 className={`text-sm uppercase font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Data Science & ML
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'PyTorch', icon: '🔥', level: 75, color: '#EE4C2C' },
              { name: 'NumPy', icon: '🧮', level: 85, color: '#013243' },
              { name: 'Pandas', icon: '🐼', level: 85, color: '#150458' },
              { name: 'scikit-learn', icon: '🤖', level: 80, color: '#F7931E' }
            ].map((skill, index) => (
              <motion.div
                key={index}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/70 hover:bg-gray-800' 
                    : 'bg-white hover:bg-gray-50 shadow-sm'
                } transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.05) }}
              >
                <span className={`text-lg ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>{skill.icon}</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{skill.name}</span>
                <div className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                  theme === 'dark' 
                    ? 'bg-amber-400/20 text-amber-300' 
                    : 'bg-cyan-100 text-cyan-700'
                }`}>{skill.level}%</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Tools Category */}
        <div>
          <h3 className={`text-sm uppercase font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Git/GitHub', icon: '📂', color: '#F05032' },
              { name: 'MongoDB', icon: '🍃', color: '#47A248' },
              { name: 'Linux', icon: '🐧', color: '#FCC624' },
              { name: 'Jupyter', icon: '📓', color: '#F37626' },
              { name: 'Hugging Face', icon: '🤗', color: '#FFBD13' }
            ].map((skill, index) => (
              <motion.div
                key={index}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/70 hover:bg-gray-800' 
                    : 'bg-white hover:bg-gray-50 shadow-sm'
                } transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.05) }}
              >
                <span className={`text-lg ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>{skill.icon}</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</Grid>


<Grid item xs={12} md={6}>
  <Card className={`
    rounded-xl overflow-hidden shadow-lg
    ${theme === 'dark' 
      ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-amber-400/10 shadow-amber-900/20' 
      : 'bg-gradient-to-r from-white to-gray-100 border border-cyan-400/5 shadow-gray-400/10'
    }
  `}>
    <CardContent>
      <div className="flex items-center mb-8">
        <motion.div
          className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-amber-500 to-amber-400 text-gray-900' 
              : 'bg-gradient-to-br from-cyan-600 to-cyan-500 text-white'
          }`}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <WorkIcon />
        </motion.div>
        <Typography variant="h5" className={`font-code ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>
          Experience Journey
        </Typography>
      </div>
      
      {/* Interactive Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className={`absolute left-3 top-0 bottom-0 w-0.5 ${
          theme === 'dark' ? 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600' : 'bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-600'
        }`}></div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
          className="space-y-12 relative"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="relative pl-12"
            >
              {/* Timeline node */}
              <motion.div 
                className={`absolute left-0 top-0 w-7 h-7 rounded-full flex items-center justify-center z-10 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-2 border-amber-400' 
                    : 'bg-white border-2 border-cyan-500'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, type: "spring" }}
                whileHover={{ scale: 1.2 }}
              >
                <span className={`text-sm ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>
                  {exp.logo}
                </span>
              </motion.div>
              
              {/* Content card */}
              <motion.div
                className={`rounded-lg p-5 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 hover:bg-gray-800/70' 
                    : 'bg-white hover:bg-gray-50'
                } transition-all duration-300 shadow-md hover:shadow-lg`}
                whileHover={{ y: -5 }}
              >
                {/* Header */}
                <div className="mb-3">
                  <div className="flex justify-between items-start">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>
                      {exp.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-amber-400/20 text-amber-300' 
                        : 'bg-cyan-100 text-cyan-700'
                    }`}>
                      {exp.duration}
                    </span>
                  </div>
                  <p className={`text-sm italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {exp.role} | {exp.location}
                  </p>
                </div>
                
                {/* Expandable content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.ul 
                    className="space-y-2 mt-4"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { 
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {exp.points.map((point, i) => (
                      <motion.li 
                        key={i}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className={`text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:top-0 ${
                          theme === 'dark' ? 'text-gray-300 before:text-amber-400' : 'text-gray-700 before:text-cyan-500'
                        }`}
                      >
                        {point}
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  {/* Skills used */}
                  {exp.skills && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            theme === 'dark' 
                              ? 'bg-gray-700/70 text-amber-300' 
                              : 'bg-gray-100 text-cyan-700'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Achievement metrics */}
                  {exp.metrics && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {exp.metrics.map((metric, i) => (
                        <div 
                          key={i}
                          className={`text-center p-2 rounded ${
                            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                          }`}
                        >
                          <span className={`block text-lg font-bold ${
                            theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'
                          }`}>
                            {metric.value}
                          </span>
                          <span className={`text-xs ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </CardContent>
  </Card>
</Grid>
</Grid>
  );
};

// AboutMe Component
const AboutMe = ({ theme }) => {
  return (
    <Card className={`
      rounded-xl overflow-hidden shadow-lg
      ${theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-amber-400/10 shadow-amber-900/20' 
        : 'bg-gradient-to-r from-white to-gray-100 border border-cyan-400/5 shadow-gray-400/10'
      }
    `}>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left side - Bio */}
          <div className="md:col-span-7 p-6 md:p-8">
            <div className="flex items-center mb-6">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-amber-500 to-amber-400 text-gray-900' 
                    : 'bg-gradient-to-br from-cyan-600 to-cyan-500 text-white'
                }`}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SchoolIcon />
              </motion.div>
              <Typography variant="h5" className={`font-code ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>
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
                I'm a <span className={`font-semibold ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>Data Science and AI student</span> at Ramaiah Institute of Technology, Bengaluru with a passion for creating innovative digital experiences. My journey in tech has equipped me with a strong foundation in:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
  {[
    { icon: "💻", text: "Web Development" },
    { icon: "🤖", text: "AI Applications" },
    { icon: "📊", text: "Data Analysis" },
    { icon: "📱", text: "Mobile Development" }
    // Replace these with your actual skills from your CV
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
      <span className={`text-2xl mr-3 ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>{item.icon}</span>
      <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{item.text}</span>
    </motion.div>
  ))}
</div>

              
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                I've led projects that enhance user experience and contributed to award-winning solutions like the <span className={`font-semibold ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>AI Stock Trading Platform</span> which won 1st Place at the Enigma Hackathon. My goal is to leverage my skills in a dynamic organization where I can continue to grow and make an impact.
              </p>
              
              {/* Achievements & Awards Section */}
              <div className="mt-8">
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>
                  Honors & Certifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: "Oracle Cloud Infrastructure", subtitle: "AI Certified Foundations Associate", icon: "🏆" },
                    { title: "ISRO Geodata Processing", subtitle: "Python Certification", icon: "🚀" },
                    { title: "Top 10 Finalist", subtitle: "Unisys Innovation Program", icon: "🥇" },
                    { title: "Python for Data Science", subtitle: "AI & Development Certificate", icon: "📊" }
                  ].map((award, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-start p-3 rounded-lg ${
                        theme === 'dark' 
                          ? 'bg-gray-800/30 border border-amber-900/20' 
                          : 'bg-white/80 border border-cyan-100 shadow-sm'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    >
                      <span className="text-xl mr-3 mt-1">{award.icon}</span>
                      <div>
                        <h5 className={`font-medium ${theme === 'dark' ? 'text-amber-300' : 'text-cyan-700'}`}>{award.title}</h5>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{award.subtitle}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right side - Stats/Highlights */}
          <div className={`md:col-span-5 p-6 md:p-8 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-cyan-50/50'}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-6"
            >
              {/* Education Timeline */}
              <div>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>
                  Education Journey
                </h4>
                <div className="relative pl-6 border-l-2 space-y-6 mb-6 mt-5 
                  ${theme === 'dark' ? 'border-amber-500/50' : 'border-cyan-500/50'}">
                  
                  <motion.div
                    className={`relative ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className={`absolute -left-[30px] top-0 w-5 h-5 rounded-full border-2 ${
                      theme === 'dark' 
                        ? 'bg-gray-900 border-amber-400' 
                        : 'bg-white border-cyan-500'
                    }`}></div>
                    <h5 className={`font-medium ${theme === 'dark' ? 'text-amber-300' : 'text-cyan-700'}`}>
                      B.Tech in Data Science & AI
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Ramaiah Institute of Technology, Bengaluru
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      2022 - 2026
                    </p>
                    <div className="mt-2 w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${theme === 'dark' ? 'bg-amber-400' : 'bg-cyan-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: '50%' }}
                        transition={{ duration: 1, delay: 1 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className={`relative ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <div className={`absolute -left-[30px] top-0 w-5 h-5 rounded-full border-2 ${
                      theme === 'dark' 
                        ? 'bg-gray-900 border-amber-400' 
                        : 'bg-white border-cyan-500'
                    }`}></div>
                    <h5 className={`font-medium ${theme === 'dark' ? 'text-amber-300' : 'text-cyan-700'}`}>
                      Pre-University College
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Indraprastha, Uppinangady
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      PCMB (Physics, Chemistry, Mathematics, Biology)
                    </p>
                  </motion.div>
                </div>
              </div>
              
              {/* Skills Showcase */}
              <div>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>
                  Core Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Python', 'Java', 'React.js', 'Flutter', 'PyTorch', 
                    'NumPy', 'Pandas', 'scikit-learn', 'MongoDB', 'Git'
                  ].map((skill, index) => (
                    <motion.span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-800 text-amber-400 border border-amber-400/20' 
                          : 'bg-white text-cyan-600 border border-cyan-400/30 shadow-sm'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + (index * 0.05) }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: theme === 'dark' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(8, 145, 178, 0.1)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Interests Section */}
              <div>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>
                  Interests
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Machine Learning', icon: '🧠' },
                    { name: 'Web Development', icon: '🌐' },
                    { name: 'UI/UX Design', icon: '🎨' },
                    { name: 'Data Visualization', icon: '📊' },
                    { name: 'Mobile Apps', icon: '📱' },
                    { name: 'AI Research', icon: '🔬' }
                  ].map((interest, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                        theme === 'dark' 
                          ? 'bg-gray-800/70 hover:bg-gray-800' 
                          : 'bg-white hover:bg-gray-50 shadow-sm'
                      } transition-all duration-200`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1 + (index * 0.05) }}
                      whileHover={{ x: 5 }}
                    >
                      <span className={`text-lg ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}>{interest.icon}</span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{interest.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};



const DynamicBackground = ({ theme }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-[-1] overflow-hidden"
      style={{ y }}
    >
      {/* Base pattern */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-[radial-gradient(circle,rgba(251,191,36,0.1)_1px,transparent_1px)]' 
          : 'bg-[radial-gradient(circle,rgba(8,145,178,0.1)_1px,transparent_1px)]'
      } bg-[length:20px_20px]`}></div>
      
      {/* Light mode specific background */}
      {theme === 'light' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/30 to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-1/3 bg-gradient-to-bl from-cyan-100/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-cyan-100/10 to-transparent rounded-full blur-3xl"></div>
        </>
      )}
      
      {/* Dark mode specific background */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-900/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-amber-800/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-cyan-900/5 to-transparent rounded-full blur-3xl"></div>
          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-full blur-2xl"
            animate={{ 
              x: [0, 100, 50, 0], 
              y: [0, 50, 100, 0],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tl from-cyan-500/10 to-cyan-500/5 rounded-full blur-2xl"
            animate={{ 
              x: [0, -100, -50, 0], 
              y: [0, -50, -100, 0],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </>
      )}
    </motion.div>
  );
};

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
        rounded-2xl mb-10 shadow-lg
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 shadow-amber-900/20' 
          : 'bg-gradient-to-r from-white to-gray-100 shadow-cyan-400/10'
        }
      `}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}
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

function App() {
  const sections = [
    { title: 'About Me', id: 'about-me' },
    { title: 'Technical Skills & Experience', id: 'skills-and-experience' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [animatedText, setAnimatedText] = useState('');
  const [isFullStack, setIsFullStack] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [filteredSections, setFilteredSections] = useState(sections);
  const [filteredProjects, setFilteredProjects] = useState(null);


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
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    // Filter sections for home page
    const filtered = sections.filter(section => 
      section.title.toLowerCase().includes(query)
    );
    
    setFilteredSections(filtered);
    
    // Also search through projects if needed
    if (query.trim()) {
      const projectMatches = projects.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) || 
        project.technologies.toLowerCase().includes(query)
      );
      setFilteredProjects(projectMatches);
    } else {
      setFilteredProjects(null);
    }
  }, [sections]);
  

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme;
  }, [theme]);

  // const sections = [
  //   { title: 'About Me', id: 'about-me' },
  //   { title: 'Technical Skills & Experience', id: 'skills-and-experience' },
  // ];
  
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
        <DynamicBackground theme={theme} />
        
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
        ? 'bg-gray-900 border-2 border-amber-400' 
        : 'text-gray-800 bg-yellow-100'
    }`}
    sx={{ 
      boxShadow: theme === 'dark' ? '0 0 5px rgba(251, 191, 36, 0.5)' : 'none',
      '&:hover': {
        backgroundColor: theme === 'dark' ? 'rgba(251, 191, 36, 0.2)' : '#f5f5f5'
      },
      '& .MuiSvgIcon-root': {
        color: theme === 'dark' ? '#fbbf24' : 'inherit' // Amber-400 color for dark mode
      }
    }}
  >
    {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
  </IconButton>
</motion.div>


        {/* Header content */}
        <header className="py-8 px-4">
        <nav className={`
  flex flex-col md:flex-row justify-between items-center p-4 mb-8 rounded-xl shadow-lg 
  backdrop-blur-md transition-all duration-300
  ${theme === 'dark' 
    ? 'bg-gray-800/60 border border-amber-900/30 shadow-amber-900/20' 
    : 'bg-white/80 border border-gray-200 shadow-gray-200/50'
  }
`}>
  <motion.div
    className="mb-4 md:mb-0 relative"
    animate={{ 
      color: isFullStack 
        ? theme === 'dark' ? '#fbbf24' : '#0891b2'
        : theme === 'dark' ? '#ffffff' : '#1e293b',
      textShadow: isFullStack ? '0 0 8px rgba(251, 191, 36, 0.6)' : 'none'
    }}
    transition={{ duration: 0.5 }}
  >
    <motion.h1
      className="text-2xl md:text-3xl font-bold relative z-10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
    >
      {animatedText}
    </motion.h1>
    {isFullStack && (
      <motion.div 
        className={`absolute -bottom-2 left-0 h-1 rounded-full ${theme === 'dark' ? 'bg-amber-400' : 'bg-cyan-500'}`}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    )}
  </motion.div>
  
  <motion.div 
    className="flex flex-wrap justify-center items-center gap-3 md:gap-5"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
  >
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button 
        component={Link} 
        to="/"
        className={`
          px-4 py-2 rounded-lg font-medium relative overflow-hidden
          transition-all duration-300 
          ${theme === 'dark' 
            ? 'text-amber-400 hover:text-amber-300' 
            : 'text-cyan-600 hover:text-cyan-500'
          }
        `}
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: theme === 'dark' ? '#fbbf24' : '#0891b2',
            transformOrigin: 'right',
            transform: 'scaleX(0)',
            transition: 'transform 0.3s ease'
          },
          '&:hover::before': {
            transformOrigin: 'left',
            transform: 'scaleX(1)'
          }
        }}
      >
        Home
      </Button>
    </motion.div>
    
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button 
        component={Link} 
        to="/projects"
        className={`
          px-4 py-2 rounded-lg font-medium relative overflow-hidden
          transition-all duration-300 
          ${theme === 'dark' 
            ? 'text-amber-400 hover:text-amber-300' 
            : 'text-cyan-600 hover:text-cyan-500'
          }
        `}
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: theme === 'dark' ? '#fbbf24' : '#0891b2',
            transformOrigin: 'right',
            transform: 'scaleX(0)',
            transition: 'transform 0.3s ease'
          },
          '&:hover::before': {
            transformOrigin: 'left',
            transform: 'scaleX(1)'
          }
        }}
      >
        Projects
      </Button>
    </motion.div>
    
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      <Button
        variant="contained"
        href="https://drive.google.com/file/d/1tFKzuLA0SEMP8TVbkhYwiUPO9YCaZdDP/view?usp=sharing"
        target="_blank"
        className={`
          px-5 py-2 rounded-lg font-medium 
          transition-all duration-300 
          ${theme === 'dark' 
            ? 'bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white' 
            : 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white'
          }
        `}
        sx={{
          boxShadow: theme === 'dark' 
            ? '0 4px 10px rgba(251, 191, 36, 0.2)' 
            : '0 4px 10px rgba(8, 145, 178, 0.2)',
          '&:hover': {
            boxShadow: theme === 'dark' 
              ? '0 6px 15px rgba(251, 191, 36, 0.3)' 
              : '0 6px 15px rgba(8, 145, 178, 0.3)',
          }
        }}
      >
        Resume
      </Button>
      <motion.div 
        className={`absolute -inset-0.5 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
          theme === 'dark' ? 'bg-amber-400' : 'bg-cyan-400'
        }`}
        style={{ zIndex: -1 }}
      />
    </motion.div>
    
    <TextField
      label="Search"
      variant="outlined"
      onChange={handleSearchChange}
      size="small"
      className="ml-4"
      InputProps={{
        className: theme === 'dark' ? "text-gray-200" : "text-gray-700",
        style: { 
          borderRadius: '12px',
          transition: 'all 0.3s ease'
        },
        endAdornment: (
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`cursor-pointer ${theme === 'dark' ? 'text-amber-400' : 'text-cyan-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        )
      }}
      InputLabelProps={{
        className: theme === 'dark' ? "text-amber-400" : "text-cyan-600",
        style: { transition: 'all 0.3s ease' }
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': { 
            borderColor: theme === 'dark' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(8, 145, 178, 0.3)',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
          },
          '&:hover fieldset': { 
            borderColor: theme === 'dark' ? 'rgba(251, 191, 36, 0.7)' : 'rgba(8, 145, 178, 0.5)',
            borderWidth: '2px'
          },
          '&.Mui-focused fieldset': { 
            borderColor: theme === 'dark' ? '#fbbf24' : '#0891b2',
            borderWidth: '2px'
          },
          '& input': {
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
            padding: '10px 14px'
          }
        },
        '& .MuiInputLabel-root': {
          color: theme === 'dark' ? 'rgba(251, 191, 36, 0.8)' : 'rgba(8, 145, 178, 0.8)'
        },
        '& .MuiInputLabel-shrink': {
          transform: 'translate(14px, -9px) scale(0.75)'
        }
      }}
    />
  </motion.div>
</nav>

          <motion.img
            src={profilePhoto}
            className={`w-48 h-48 md:w-52 md:h-52 rounded-full mx-auto my-8 object-cover ${
              theme === 'dark' 
                ? 'shadow-lg shadow-amber-500/30' 
                : 'shadow-lg shadow-cyan-500/20 border-4 border-white'
            }`}
            alt="Profile"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: theme === 'dark' 
                ? "0px 0px 20px rgba(251, 191, 36, 0.7)" 
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
          ? 'bg-gray-800/70 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-400 hover:text-gray-900' 
          : 'text-cyan-600 bg-gray-100/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-400 hover:text-white shadow-sm'
      } transition-all duration-300 p-2.5 rounded-full`}
      sx={{ 
        boxShadow: theme === 'dark' ? '0 0 10px rgba(251, 191, 36, 0.2)' : '0 0 10px rgba(8, 145, 178, 0.1)',
        '& .MuiSvgIcon-root': {
          color: theme === 'dark' ? '#fbbf24' : 'inherit' // Amber-400 color for dark mode
        }
      }}
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
          ? 'bg-gray-800/70 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-400 hover:text-gray-900' 
          : 'text-cyan-600 bg-gray-100/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-400 hover:text-white shadow-sm'
      } transition-all duration-300 p-2.5 rounded-full`}
      sx={{ 
        boxShadow: theme === 'dark' ? '0 0 10px rgba(251, 191, 36, 0.2)' : '0 0 10px rgba(59, 130, 246, 0.1)',
        '& .MuiSvgIcon-root': {
          color: theme === 'dark' ? '#66fcf1' : 'inherit' // Cyan-400 color for dark mode
        }
      }}
    >
      <LinkedInIcon />
    </IconButton>
  </motion.div>
  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
    <IconButton 
      href="mailto:vkabhishek04@gmail.com"
      className={`${
        theme === 'dark' 
          ? 'bg-gray-800/70 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-400 hover:text-gray-900' 
          : 'text-amber-600 bg-gray-100/80 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-400 hover:text-white shadow-sm'
      } transition-all duration-300 p-2.5 rounded-full`}
      sx={{ 
        boxShadow: theme === 'dark' ? '0 0 10px rgba(251, 191, 36, 0.2)' : '0 0 10px rgba(251, 191, 36, 0.1)',
        '& .MuiSvgIcon-root': {
          color: theme === 'dark' ? '#fbbf24' : 'inherit' // Amber-400 color for dark mode
        }
      }}
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
      <Suspense fallback={<div className="text-center py-8 text-amber-400">Loading...</div>}>
        {filteredSections.map((section) => (
          <Section key={section.id} id={section.id} title={section.title} theme={theme}>
            {getSectionContent(section.id)}
          </Section>
        ))}
        
        {/* Show matching projects on home page if any */}
        {filteredProjects && filteredProjects.length > 0 && searchQuery.trim() !== '' && (
          <Section id="search-projects" title="Matching Projects" theme={theme}>
            <Projects theme={theme} filteredProjects={filteredProjects} />
          </Section>
        )}
      </Suspense>
    }
  />
  <Route 
    path="/projects" 
    element={
      <Suspense fallback={<div className="text-center py-8 text-amber-400">Loading...</div>}>
        <Projects theme={theme} filteredProjects={filteredProjects} />
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
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
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
            ? 'bg-gray-900/90 border-amber-400/30' 
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
            <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>&copy; {new Date().getFullYear()} Abhishek V K</p>
            <p className="my-2">
              Email: <a href="mailto:vkabhishek04@gmail.com" className={`${
                theme === 'dark' ? 'text-amber-400 hover:text-amber-300' : 'text-cyan-600 hover:text-cyan-500'
              } hover:underline transition-colors duration-300`}>vkabhishek04@gmail.com</a>
            </p>
            <p className="flex flex-wrap justify-center gap-2">
              GitHub: <a href="https://github.com/Abhishekvk04" target="_blank" rel="noopener noreferrer" className={`${
                theme === 'dark' ? 'text-amber-400 hover:text-amber-300' : 'text-cyan-600 hover:text-cyan-500'
              } hover:underline transition-colors duration-300`}>Abhishekvk04</a> |
              LinkedIn: <a href="https://www.linkedin.com/in/abhishek-v-k-574846248/" target="_blank" rel="noopener noreferrer" className={`${
                theme === 'dark' ? 'text-amber-400 hover:text-amber-300' : 'text-cyan-600 hover:text-cyan-500'
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


