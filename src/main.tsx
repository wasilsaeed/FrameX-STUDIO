import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MotionConfig } from 'framer-motion';
import './styles/index.css';
import './styles/editorial.css';
import './styles/chrome.css';
import './styles/secondary.css';
import './styles/contact.css';
import './styles/portfolio.css';
import './styles/testimonials.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></React.StrictMode>);
