import React, { useState } from 'react';
import { getCode } from '../services/api';

const GetCode = ({ onResponse }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
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

    try {
      const result = await getCode(email);
      setCode(result); 
      onResponse(result, { email });
      setResponse(null); 
      setError(null);
    } catch (error) {
      console.error('Error getting code:', error);
      const errorMessage = error.response ? error.response.data : { error: 'Unknown error occurred' };
      setResponse(errorMessage);
      setError(errorMessage.error);
    }
  };

  return (
    <div className="get-code-container">
      <form onSubmit={handleSubmit}>
        <h2>Get Code</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <button type="submit">Get Code</button>
      </form>
      {code && <p>Code: {code}</p>}
      {error && <p className="error-message">{error}</p>}
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

export default GetCode;
