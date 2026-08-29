import React from 'react';
import Student from './Student';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Batch CSE-27 Student List</h1>
      <div className="container">
        {/* Passing data via props */}
        <Student name="Shiv" course="B.Tech CSE" marks="98" />
        <Student name="Yash " course="B.Tech IT" marks="92" />
        <Student name="Aditya" course="B.Tech CSE" marks="96" />
      </div>
    </div>
  );
}

export default App;