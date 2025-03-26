import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import { Dashboard } from './layouts/Dashboard';
import { TaskLog } from './layouts/TaskLog';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/tasks' element={<TaskLog/>}/>
    </Routes>
  );
}

export default App;
