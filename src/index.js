import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Skills from './Components/Skills/Skills';
import Projects from './Components/Projects/Projects';
import Contact from './Components/Contacts/Contacts';
import './index.css';

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
