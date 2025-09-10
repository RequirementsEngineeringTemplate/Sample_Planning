import React from 'react';
import Scheduler from './components/Scheduler';

function App() {
  const appStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px 0',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  };

  const titleStyle = {
    fontSize: '2.5em',
    margin: '0 0 10px 0',
    fontWeight: '300',
  };

  const subtitleStyle = {
    fontSize: '1.2em',
    margin: 0,
    color: '#666',
    fontWeight: 'normal',
  };

  return (
    <div style={appStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Sample Planning Scheduler</h1>
        <p style={subtitleStyle}>A simple and intuitive event scheduling system</p>
      </div>
      <Scheduler />
    </div>
  );
}

export default App;