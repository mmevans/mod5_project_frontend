import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { LandingPage } from './components/Landing/LandingPage.js';
import  {UserHomepage } from './components/UserHomepage/UserHomepage.js';
import JoinRoom from './components/joinRoom/JoinRoom.js';
import MainLobby from './components/MainLobby/MainLobby.js';
import Test from './Test.js'
function App() {
  return (
    <div>
       <BrowserRouter>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path='/homepage' component={UserHomepage} />
      <Route exact path='/join-room' component={JoinRoom} />
      <Route exact path='/main-lobby' component={MainLobby}/>
      <Route exact path='/test' component={Test}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
