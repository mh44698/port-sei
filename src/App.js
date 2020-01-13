import React from 'react';
import './Components/App.css';
import About from './Components/About.js'
import Home from './Components/Home.js'
import ContactInfo from './Components/ContactInfo.js'
import Header from './Components/Header.js'
import Nav from './Components/Nav.js'
import OnlineResume from './Components/OnlineResume.js'
import Projects from './Components/Projects.js'
import PythonBasic from './Components/PythonBasic.js'
import PythonBasicSQL from './Components/PythonBasicSQL.js'
import PythonBasicJSON from './Components/PythonBasicJSON.js'
import RscriptDB2 from './Components/RscriptDB2.js'
import RscriptMongoDB from './Components/RscriptMongoDB.js'
import RscriptStockData from './Components/RScriptStockData'


import {BrowserRouter as Router, Switch, Route} from  'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav />
      <header><h1>Portfolio Page for Mark Holmes</h1></header>
      <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/About" component = {About} />
      <Route path="/ContactInfo" component = {ContactInfo} />
      <Route path="/Header" component = {Header} />
      <Route path="/OnlineResume" component = {OnlineResume} />
      <Route path="/Projects" component = {Projects} />
      <Route path="/PythonBasic" component = {PythonBasic} />
      <Route path="/PythonBasicSQL" component = {PythonBasicSQL} />
      <Route path="/PythonBasicJSON" component = {PythonBasicJSON} />
      <Route path="/RscriptDB2" component = {RscriptDB2} />
      <Route path="/RscriptMongoDB" component = {RscriptMongoDB} />
      <Route path="/RscriptStockData" component = {RscriptStockData} />

      </Switch>
    </div>
    </Router>
  );
}


export default App;