import React, { useState, useEffect } from 'react';
import { getRoles } from '../services/api';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [showRoles, setShowRoles] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data.roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const toggleShowRoles = () => {
    setShowRoles(!showRoles);
  };

  return (
    <div className="roles-container">
        <div className="roles-header">
      <h2>Roles</h2>
      <button onClick={toggleShowRoles}>
        {showRoles ? 'Hide roles list' : 'Show list of roles'}
      </button>
      {showRoles && (
        <ul className="roles-list">
          {roles.map((role, index) => (
            <li key={index} className="roles-list-item">{role}</li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default Roles;
