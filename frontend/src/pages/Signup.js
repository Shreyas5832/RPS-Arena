import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signup } from '../services/api';
import '../styles/Auth.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(username, password);
      authLogin(response.data.token, response.data.username);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Sign Up</button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;