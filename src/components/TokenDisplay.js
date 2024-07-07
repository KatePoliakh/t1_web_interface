import React from 'react';

const TokenDisplay = ({ email, code, token, userData }) => {
  return (
    <div>
      <h2>Token Information</h2>
      <p>Email: {email}</p>
      <p>Code: {code}</p>
      <p>Token: {token}</p>
      {userData && (
        <div>
          <h3>User Data:</h3>
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}
    </div>
  );
};

export default TokenDisplay;
