import React from 'react';
import logo from './logo.svg';
import tslogo from './typescript.svg';
import './App.css';
import { Route, HashRouter, Switch } from "react-router-dom";
import { Row, Col, Divider } from 'antd';

import LoginPage from "./pages/Login/index";
import HomePage from "./pages/Home/index";

function App() {
  return (
    <div className="container">
      <Row justify="center" >
        <Col className="gutter-row" xs={12} sm={12} md={12} lg={10} xl={6}>
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
        <Col className="gutter-row" xs={12} sm={12} md={12} lg={10} xl={6}>
          <img src={tslogo} className="App-logo" alt="logo" />
        </Col>
      </Row>

      <HashRouter>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/login" exact component={LoginPage}></Route>
        </Switch>
      </HashRouter>
      
    </div>
  );
}

export default App;
