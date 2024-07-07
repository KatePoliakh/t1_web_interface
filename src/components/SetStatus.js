import React, { useState } from 'react';
import { setStatus } from '../services/api';

const SetStatus = ({ email }) => {
  const [inputEmail, setInputEmail] = useState(email || '');
  const [code, setCode] = useState('');
  const [status, setStatusInput] = useState('');
  const [token, setToken] = useState('');
  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState({});

  const generateToken = () => {
    const combined = `${inputEmail}:${code}`;
    return btoa(combined);
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!inputEmail.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!code.trim()) {
      newErrors.code = 'Code is required';
      valid = false;
    }

    if (!status.trim()) {
      newErrors.status = 'Status is required';
      valid = false;
    } else if (status.trim().toLowerCase() !== 'increased') {
        newErrors.status = 'Invalid status. Status must be "increased"';
        valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const generatedToken = generateToken();
    setToken(generatedToken);

    try {
      const response = await setStatus(generatedToken, status);
      alert('Status set successfully');
      setResponse(response);
    } catch (error) {
      console.error('Error setting status:', error);
      setResponse(error.response ? error.response.data : { error: 'Unknown error occurred' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Set Status</h2>
        <input
          type="email"
          placeholder="Email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        
        <input
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {errors.code && <p className="error-message">{errors.code}</p>}
        
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatusInput(e.target.value)}
        />
        {errors.status && <p className="error-message">{errors.status}</p>}
        
        <button type="submit">Set Status</button>
      </form>
      {token && <p>Token: {token}</p>}
      {response && (
        <div> 
            <h2>Server Response:</h2>
        <div className="response">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
        </div>
      )}
    </div>
  );
};

export default SetStatus;
