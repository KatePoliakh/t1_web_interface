import React, { useState } from 'react';
import { signUp } from '../services/api';

const validRoles = [
  'Системный аналитик',
  'Разработчик Java',
  'Разработчик JS/React',
  'Тестировщик',
  'Прикладной администратор'
];

const SignUpForm = ({ onResponse }) => {
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    email: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (formData.last_name.trim() === '') {
      newErrors.last_name = 'Last Name is required';
      valid = false;
    }

    if (formData.first_name.trim() === '') {
      newErrors.first_name = 'First Name is required';
      valid = false;
    }

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
      valid = false;
    }

     // Email format validation (basic regex)
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (formData.email.trim() && !emailRegex.test(email)) {
       newErrors.email = 'Invalid email format';
       valid = false;
     }

    if (formData.role.trim() === '') {
      newErrors.role = 'Role is required';
      valid = false;
    } else if (!validRoles.includes(formData.role.trim())) {
      newErrors.role = 'Invalid role. Please select a valid role';
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

    console.log('Submitting form with data:', formData); 

    try {
      const response = await signUp(formData);
      setResponse(response);
      onResponse(response, formData);
      alert('Sign up successful');
      setFormData({
        last_name: '',
        first_name: '',
        email: '',
        role: ''
      });
    } catch (error) {
      console.error('Error signing up:', error);
      setResponse(error.response ? error.response.data : { error: 'Unknown error occurred' });
      onResponse(error.response ? error.response.data : { error: 'Unknown error occurred' }, formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        {errors.last_name && <p className="error-message">{errors.last_name}</p>}
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {errors.first_name && <p className="error-message">{errors.first_name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />
        {errors.role && <p className="error-message">{errors.role}</p>}
        <button type="submit">Sign Up</button>
      </form>
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

export default SignUpForm;
