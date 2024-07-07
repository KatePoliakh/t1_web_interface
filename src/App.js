import React, { useState } from 'react';
import Roles from './components/Roles';
import SignUpForm from './components/SignUpForm';
import GetCode from './components/GetCode';
import SetStatus from './components/SetStatus';
import './App.css';

const App = () => {
  const [responses, setResponses] = useState([]);
  const [email, setEmail] = useState('');

  const handleResponse = (response, formData) => {
    setResponses(prevResponses => [...prevResponses, response]);
    if (formData) {
      setEmail(formData.email);
    }
  };

  return (
    <div className="body">
      <h1>T1 Camp API Interface</h1>

      <h2>Step 1: Choose your role from the list</h2>
      <div className="roles-container"><Roles /></div>

      <h2>Step 2: Enter your data including chosen role</h2>
      <div className="sign-up-container"><SignUpForm onResponse={handleResponse} /></div>
      
      <h2>Step 3: Get your personal code that was generated after registration</h2>
      <div className="get-code-container"><GetCode onResponse={handleResponse} /></div>

      <h2>Step 4: Set status 'increased' using your email and code</h2>
      <SetStatus onResponse={handleResponse} email={email} />
      

      <footer>
        <a className="link" href="http://193.19.100.32:7000/docs#/api" target="_blank" rel="noopener noreferrer">
          Swagger API Documentation
        </a>
      </footer>
    </div>
  );
};

export default App;
