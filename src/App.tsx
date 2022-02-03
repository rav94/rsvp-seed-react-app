import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import TabComponent from './components/Tab';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link,Navigate } from 'react-router-dom';
import About from './components/about/About';

function App() {
  return (
    <Container fluid>
      <Router>
        <Routes>
          <Route
            path='/home'
            element={
              <Row>
                <Col>
                  <TabComponent></TabComponent>
                </Col>
              </Row>
            }
          ></Route>
                   <Route
            path='/about'
            element={
              <Row>
                <Col>
                  <About></About>
                </Col>
              </Row>
            }
          ></Route>
          <Route path='*' element={
            <Navigate replace to='/home'></Navigate>
          }>
            
          </Route>
        </Routes>
      </Router>
    </Container>

  );
}

export default App;
