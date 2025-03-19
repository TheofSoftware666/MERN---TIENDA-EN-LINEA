import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import AuthLayout from './layout/AuthLayout';
import Home from './pages/Home.jsx';

function App() {

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Home/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
