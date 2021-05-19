import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Skills from './Components/Skills/Skills';
import Projects from './Components/Projects/Projects';
import Contact from './Components/Contacts/Contacts';
import Footer from './Components/Footer/Footer';

ReactDOM.render(<>
  <Navigation></Navigation>
  <Home></Home>
  <About></About>
  <Skills></Skills>
  <Projects></Projects>
  <Contact></Contact>
</>,
document.getElementById('root')
);
