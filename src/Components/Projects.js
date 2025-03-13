import React from 'react';
import { Typography, IconButton, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import projectImage2 from '../Assests/abstract.jpg';
import projectImage3 from '../Assests/abstract1.jpg';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Tax Craft',
    description: 'Used LLM to read PDFs and help users with tax deduction methods.',
    technologies: 'Python, Jupyter notebook, Langchain, Streamlit, APIs',
    date: 'Oct 2023',
    image: projectImage3,
    link: 'https://github.com/Abhishekvk04/TaxCraft-CodeRanges'
  },
  {
    title: 'Club Fusion',
    description: 'Developed a platform for club recruitment and notifications.',
    technologies: 'Dart, Flutter',
    date: 'Oct 2023',
    image: projectImage2,
    link: 'https://github.com/Abhishekvk04/ClubFusion'
  },
  {
    title: 'Green Chips',
    description: 'Provided a solution for E-Waste management to maximize consumer profit.',
    technologies: 'HTML, CSS, JavaScript, Python',
    date: 'Aug 2023',
    image: projectImage3,
    link: 'https://github.com/Abhishekvk04/Techie-Titans-Green_Chips'
  },
  {
    title: 'BudgetBuddy',
    description: 'A website for tracking expenses with detailed analytics.',
    technologies: 'ReactJS, MongoDB, NodeJS, Mongoose, ExpressJS, Postman, TailwindCSS',
    date: 'July 2024',
    image: projectImage3,
    link: 'https://github.com/Abhishekvk04/BudgetBuddy'
  },
  {
    title: 'Personal Website',
    description: 'My personal website to showcase my skills and projects.',
    technologies: 'ReactJS, CSS3, TailwindCSS',
    date: 'July 2024',
    image: projectImage3,
    link: 'https://github.com/Abhishekvk04/Portfolio-website'
  },
  {
    title: 'Contributed to IEEE-RIT Website',
    description: 'Improved the user interface of the website.',
    technologies: 'NextJS, ReactJS, TailwindCSS',
    date: 'Aug 2023',
    image: projectImage3,
    link: 'https://github.com/Abhishekvk04/ieee-ritb-website'
  },
  {
    title: 'Diacure',
    description: 'Prediction of Diabetes through retinal images using an optimized neural network.',
    technologies: 'HuggingFace, Kaggle, Fastai, PyTorch',
    date: 'Aug 2023',
    image: projectImage3,
    link: 'https://github.com/Abhishekvk04/Diacure-Diabetics-Prediction'
  }
];

const Projects = ({ theme = 'dark' }) => {
  return (
    <div className={`w-full px-4 py-12 ${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900 to-gray-950' 
        : 'bg-gradient-to-r from-gray-50 to-gray-100'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
       <Typography variant="h2" className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
  theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
}`}>
  <motion.span
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 100 }}
    className="relative inline-block"
  >
    <span className="relative z-10 tracking-wide">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">P</span>
      <span>rojects</span>
    </span>
    <motion.span 
      className={`absolute -bottom-2 left-0 w-full h-1 rounded-full ${
        theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-400' : 'bg-gradient-to-r from-cyan-600 to-blue-500'
      }`}
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ delay: 0.8, duration: 0.8 }}
    />
    <motion.span
      className={`absolute -bottom-2 left-0 w-8 h-1 rounded-full ${
        theme === 'dark' ? 'bg-cyan-300' : 'bg-cyan-400'
      }`}
      animate={{ 
        x: ['0%', '100%'],
        opacity: [0.8, 0.2, 0.8]
      }}
      transition={{ 
        duration: 2.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </motion.span>
</Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <div className={`rounded-xl overflow-hidden shadow-lg h-full transition-all duration-300 group ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-500/50'
                    : 'bg-white border border-gray-200 hover:border-cyan-500/50 shadow-md'
                }`}>
                  <div className="relative overflow-hidden h-48">
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      theme === 'dark' 
                        ? 'from-gray-900 to-transparent' 
                        : 'from-gray-800 to-transparent'
                    } opacity-60`} />
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs text-white ${
                      theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-600'
                    }`}>
                      {project.date}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                    <Typography variant="h5" className={`text-xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                    }`}>
                      {project.title}
                    </Typography>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.split(', ').map((tech, i) => (
                        <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gray-800 text-cyan-300' 
                            : 'bg-gray-100 text-cyan-600'
                        }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <Typography variant="body1" className={`mb-4 flex-grow ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {project.description}
                    </Typography>
                    
                    <div className="mt-auto flex justify-end">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton 
                          href={project.link} 
                          target="_blank" 
                          className={`transition-colors duration-300 ${
                            theme === 'dark'
                              ? 'text-cyan-400 hover:text-white hover:bg-cyan-500'
                              : 'text-cyan-600 hover:text-white hover:bg-cyan-600'
                          }`}
                          sx={{ 
                            boxShadow: theme === 'dark' 
                              ? '0 0 10px rgba(255, 255, 255, 0.2)' 
                              : '0 0 10px rgba(8, 145, 178, 0.2)'
                          }}
                        >
                          <GitHubIcon />
                        </IconButton>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </div>
  );
};

export default Projects;
