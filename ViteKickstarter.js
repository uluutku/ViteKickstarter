#!/usr/bin/env node

const inquirer = require('inquirer');
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the prompt function (works with different Inquirer versions)
const prompt = inquirer.prompt || inquirer.createPromptModule();

// Helper: convert string to kebab-case
function toKebabCase(str) {
  return str
    .match(/[A-Za-z0-9]+/g)
    .map(word => word.toLowerCase())
    .join('-');
}

const commonPackages = [
  '@mui/material',
  '@mui/icons-material',
  '@emotion/react',
  '@emotion/styled',
  'react-router-dom',
  'react-icons',
  'axios',
  'lodash',
  'framer-motion',
  'react-dark-mode-toggle',
  'yup',
  'formik',
  'prop-types',
  'classnames',
  'react-helmet',
  'styled-components'
];

const expandedPackages = [
  ...commonPackages,
];

const fullPackages = [
  ...expandedPackages,
  'react-confetti',
  'dayjs',
  'swr',
  'immer'
];

// Prompts for project name and template choice
async function askQuestions() {
  return await prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      validate: input => (input ? true : 'Please enter a valid project name.')
    },
    {
      type: 'list',
      name: 'templateChoice',
      message: 'Select package template to install:',
      choices: [
        { name: '1) Common Essentials', value: 'common' },
        { name: '2) Expanded Essentials', value: 'expanded' },
        { name: '3) Full Essentials', value: 'full' }
      ]
    }
  ]);
}

async function run() {
  try {
    // Get user answers
    const answers = await askQuestions();
    const rawName = answers.projectName.trim();
    const projectName = toKebabCase(rawName);
    const templateChoice = answers.templateChoice;

    console.log(`\nCreating project "${projectName}" with Vite + React (JSX)...\n`);

    // Run Vite create command (React template)
    const createCmd = `npm create vite@latest ${projectName} -- --template react`;
    execSync(createCmd, { stdio: 'inherit' });

    // Change directory to the new project folder
    process.chdir(projectName);

    console.log('\nInstalling base dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Install additional packages based on selected template
    let additionalPackages = [];
    if (templateChoice === 'common') {
      additionalPackages = commonPackages;
    } else if (templateChoice === 'expanded') {
      additionalPackages = expandedPackages;
    } else if (templateChoice === 'full') {
      additionalPackages = fullPackages;
    }
    if (additionalPackages.length > 0) {
      console.log(`\nInstalling additional packages for the "${templateChoice}" template...\n`);
      execSync(`npm install ${additionalPackages.join(' ')}`, { stdio: 'inherit' });
    }

    // ---------------------------
    // Create a modern folder structure:
    // src/
    //   ├── components/
    //   │     Header.jsx
    //   │     Footer.jsx
    //   ├── pages/
    //   │     Level1.jsx         (always)
    //   │     Level2.jsx         (if expanded or full)
    //   │     Level3.jsx         (if full)
    //   │     About.jsx
    //   ├── App.jsx
    //   ├── main.jsx
    //   └── main.css
    // ---------------------------
    const srcDir = path.join(process.cwd(), 'src');
    const componentsDir = path.join(srcDir, 'components');
    const pagesDir = path.join(srcDir, 'pages');
    if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });
    if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

    // ---------------------------
    // Write file contents
    // ---------------------------

    // src/main.jsx – entry point remains unchanged
    const mainJSXContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
    fs.writeFileSync(path.join(srcDir, 'main.jsx'), mainJSXContent, 'utf8');

    // src/main.css – modern CSS remains unchanged
    const mainCSSContent = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

:root {
  /* Light Mode Palette */
  --color-background: #ffffff;
  --color-text: #333333;
  --color-primary: #6200ee;
  --color-primary-light: #bb86fc;
  --color-header-background: #f5f5f5;
  --color-footer-background: #f5f5f5;
  
  /* Typography & Spacing */
  --font-family: 'Inter', sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.5rem;
  --font-size-xl: 2rem;
  --line-height: 1.6;
  --transition-duration: 0.3s;
}

[data-theme="dark"] {
  /* Dark Mode Palette */
  --color-background: #121212;
  --color-text: #e0e0e0;
  --color-primary: #bb86fc;
  --color-primary-light: #6200ee;
  --color-header-background: #333333;
  --color-footer-background: #1e1e1e;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: var(--font-size-base);
}

body {
  font-family: var(--font-family);
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: var(--line-height);
  transition: background-color var(--transition-duration), color var(--transition-duration);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-duration);
}

a:hover {
  color: var(--color-primary-light);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-header-background);
  transition: background-color var(--transition-duration);
}

.footer {
  padding: 1rem 2rem;
  text-align: center;
  background-color: var(--color-footer-background);
  transition: background-color var(--transition-duration);
}

main {
  flex: 1;
  padding: 2rem;
}

h1 {
  font-size: var(--font-size-xl);
  margin-bottom: 1rem;
}

h2 {
  font-size: var(--font-size-lg);
  margin-bottom: 0.75rem;
}

p {
  font-size: var(--font-size-md);
  margin-bottom: 1rem;
}

button {
  cursor: pointer;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: var(--font-size-md);
  font-weight: 500;
  transition: background-color var(--transition-duration), transform var(--transition-duration);
}

button:hover {
  transform: scale(1.02);
}

.nav-link {
  margin-right: 1rem;
}

/* Form styles */
.form-group {
  margin-bottom: 1rem;
}
.form-input {
  padding: 0.5rem;
  width: 100%;
  font-size: var(--font-size-md);
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color var(--transition-duration);
}
.form-input:focus {
  border-color: var(--color-primary);
}
.form-error {
  color: red;
  font-size: var(--font-size-sm);
  margin-top: 0.25rem;
}
`;
    fs.writeFileSync(path.join(srcDir, 'main.css'), mainCSSContent, 'utf8');

    // ---------------------------
    // src/App.jsx – dynamic routing based on chosen packages
    // ---------------------------
    let appImports = `import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Level1 from './pages/Level1';
`;
    if (templateChoice === 'expanded' || templateChoice === 'full') {
      appImports += `import Level2 from './pages/Level2';\n`;
    }
    if (templateChoice === 'full') {
      appImports += `import Level3 from './pages/Level3';\n`;
    }
    appImports += `import About from './pages/About';
import './main.css';
`;

    let appRoutes = `  <Routes>
    <Route path="/" element={<Level1 />} />
    <Route path="/level1" element={<Level1 />} />
`;
    if (templateChoice === 'expanded' || templateChoice === 'full') {
      appRoutes += `    <Route path="/level2" element={<Level2 />} />\n`;
    }
    if (templateChoice === 'full') {
      appRoutes += `    <Route path="/level3" element={<Level3 />} />\n`;
    }
    appRoutes += `    <Route path="/about" element={<About />} />
  </Routes>
`;

    const appJSXContent = `${appImports}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    // Set data attribute for theming
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
${appRoutes}        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
`;
    fs.writeFileSync(path.join(srcDir, 'App.jsx'), appJSXContent, 'utf8');

    // ---------------------------
    // src/components/Header.jsx – update nav links dynamically
    // ---------------------------
    // Build nav links based on the chosen template
    let navLinks = `<Link to="/level1" className="nav-link">Level 1</Link>`;
    if (templateChoice === 'expanded' || templateChoice === 'full') {
      navLinks += `\n          <Link to="/level2" className="nav-link">Level 2</Link>`;
    }
    if (templateChoice === 'full') {
      navLinks += `\n          <Link to="/level3" className="nav-link">Level 3</Link>`;
    }
    navLinks += `\n          <Link to="/about" className="nav-link">About</Link>`;

    const headerJSXContent = `import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from 'react-dark-mode-toggle';
import classNames from 'classnames';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={classNames('header')}>
      <div className="header-left" style={{ display: 'flex', alignItems: 'center' }}>
        <MenuIcon style={{ marginRight: '0.5rem' }} />
        <nav>
          ${navLinks}
        </nav>
      </div>
      <div>
        <DarkModeToggle onChange={toggleDarkMode} checked={darkMode} size={60} />
      </div>
    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Header;
`;
    fs.writeFileSync(path.join(componentsDir, 'Header.jsx'), headerJSXContent, 'utf8');

    // ---------------------------
    // src/components/Footer.jsx – remains unchanged
    // ---------------------------
    const footerJSXContent = `import React from 'react';
import PropTypes from 'prop-types';

const Footer = () => {
  return (
    <footer className="footer">
      <p>RabbitWiz &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
`;
    fs.writeFileSync(path.join(componentsDir, 'Footer.jsx'), footerJSXContent, 'utf8');

    // ---------------------------
    // src/pages/Level1.jsx – Common packages demo page
    // ---------------------------
    const level1JSXContent = `import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Invalid email format')
});

const Level1 = () => {
  const [apiData, setApiData] = useState(null);

  const fetchAPIData = async () => {
    try {
      const response = await axios.get('https://api.github.com');
      const picked = _.pick(response.data, ['current_user_url', 'current_user_authorizations_html_url']);
      setApiData(picked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Level 1 Package Demo</h1>
      <motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
        <p>Animated content with Framer Motion!</p>
      </motion.div>
      <div style={{ margin: '1rem' }}>
        <Button variant="contained" color="primary" onClick={fetchAPIData}>
          Fetch API Data (axios & lodash)
        </Button>
      </div>
      {apiData && (
        <div style={{ margin: '1rem', textAlign: 'left' }}>
          <h2>API Data:</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
      <div style={{ margin: '1rem', textAlign: 'left' }}>
        <h2>Formik + Yup Form Demo:</h2>
        <Formik
          initialValues={{ username: '', email: '' }}
          validationSchema={formSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            alert('Form Submitted: ' + JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field type="text" name="username" placeholder="Username" className="form-input" />
                <ErrorMessage name="username" component="div" className="form-error" />
              </div>
              <div className="form-group">
                <Field type="email" name="email" placeholder="Email" className="form-input" />
                <ErrorMessage name="email" component="div" className="form-error" />
              </div>
              <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                Submit Form
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Level1;
`;
    fs.writeFileSync(path.join(pagesDir, 'Level1.jsx'), level1JSXContent, 'utf8');

    // ---------------------------
    // src/pages/Level2.jsx – Expanded packages demo page (if applicable)
    // ---------------------------
    if (templateChoice === 'expanded' || templateChoice === 'full') {
      const level2JSXContent = `import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const StyledContainer = styled.div\`
  padding: 2rem;
  text-align: center;
  background: #f0f0f0;
  border-radius: 8px;
\`;

const Level2 = () => {
  return (
    <StyledContainer>
      <Helmet>
        <title>Level 2 Demo - Expanded Packages</title>
      </Helmet>
      <h1>Level 2 Package Demo</h1>
      <p>This demo uses react-helmet and styled-components.</p>
    </StyledContainer>
  );
};

export default Level2;
`;
      fs.writeFileSync(path.join(pagesDir, 'Level2.jsx'), level2JSXContent, 'utf8');
    }

    // ---------------------------
    // src/pages/Level3.jsx – Full packages demo page (if applicable)
    // ---------------------------
    if (templateChoice === 'full') {
      const level3JSXContent = `import React, { useState, Suspense } from 'react';
import dayjs from 'dayjs';
import useSWR from 'swr';
import axios from 'axios';
import { produce } from 'immer';
import { Button } from '@mui/material';

const fetcher = url => axios.get(url).then(res => res.data);

const LazyConfetti = React.lazy(() =>
  import('react-confetti').catch(() => ({ default: () => null }))
);

const Level3 = () => {
  const [confettiActive, setConfettiActive] = useState(false);
  const [immerData, setImmerData] = useState({ count: 0 });
  const { data: jokeData, error: jokeError } = useSWR('https://api.chucknorris.io/jokes/random', fetcher);

  const handleConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 3000);
  };

  const handleImmerDemo = () => {
    setImmerData(produce(draft => {
      draft.count += 1;
    }));
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Level 3 Package Demo</h1>
      <p>Today is {dayjs().format('MMMM D, YYYY')}</p>
      <div style={{ margin: '1rem' }}>
        <Button variant="contained" color="primary" onClick={handleConfetti}>
          Trigger Confetti!
        </Button>
      </div>
      <Suspense fallback={<div>Loading Confetti...</div>}>
        {confettiActive && <LazyConfetti width={window.innerWidth} height={window.innerHeight} />}
      </Suspense>
      <div style={{ margin: '1rem' }}>
        <h2>Random Joke (SWR):</h2>
        {jokeError && <p>Error loading joke.</p>}
        {jokeData ? <p>{jokeData.value}</p> : <p>Loading joke...</p>}
      </div>
      <div style={{ margin: '1rem' }}>
        <h2>Immer Demo:</h2>
        <p>Count: {immerData.count}</p>
        <Button variant="outlined" onClick={handleImmerDemo}>Increase Count (Immer)</Button>
      </div>
    </div>
  );
};

export default Level3;
`;
      fs.writeFileSync(path.join(pagesDir, 'Level3.jsx'), level3JSXContent, 'utf8');
    }

    // ---------------------------
    // src/pages/About.jsx – About page remains mostly unchanged
    // ---------------------------
    const aboutJSXContent = `import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Helmet>
        <title>About - RabbitWiz App</title>
      </Helmet>
      <h1>About</h1>
      <p>This page demonstrates react-helmet for managing the document head.</p>
    </div>
  );
};

export default About;
`;
    fs.writeFileSync(path.join(pagesDir, 'About.jsx'), aboutJSXContent, 'utf8');

    console.log('\nProject files and folder structure updated successfully!');

    // ---------------------------
    // Open the code editor (VS Code) in the project folder
    // ---------------------------
    console.log('\nOpening your project in VS Code...');
    spawn('code', ['.'], { stdio: 'inherit', shell: true });

    // ---------------------------
    // Start the development server (detached so it keeps running)
    // ---------------------------
    console.log('\nStarting development server...');
    const devProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
      detached: true
    });

    // Automatically open the browser at the default Vite URL (port 5173)
    const port = 5173;
    let openCommand = '';
    if (process.platform === 'win32') {
      openCommand = 'start';
    } else if (process.platform === 'darwin') {
      openCommand = 'open';
    } else {
      openCommand = 'xdg-open';
    }
    spawn(openCommand, [`http://localhost:${port}`], {
      stdio: 'ignore',
      detached: true,
      shell: true
    });

    console.log('\nYour Vite + React project is ready and the dev server is running!');
    console.log('Happy coding!\n');
    process.exit(0);
  } catch (error) {
    console.error('\nAn error occurred:', error);
    process.exit(1);
  }
}

run();
