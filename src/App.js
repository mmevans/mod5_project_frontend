import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { LandingPage } from './components/Landing/LandingPage.js'
import { SignupForm } from './components/Landing/SignupForm.js'
import { LoginForm } from './components/Landing/LoginForm.js'
import  {UserHomepage } from './components/UserHomepage/UserHomepage.js'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/signup" component={SignupForm}/>
      <Route exact path="/login" component={LoginForm}/>
      <Route exact path='/homepage' component={UserHomepage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
