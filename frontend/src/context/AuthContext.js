import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  // Load user from token on mount
  useEffect(() => {
    if (token) {
      // Optionally validate token with backend
      setUser({ username: localStorage.getItem('username') });
    }
  }, [token]);

  const login = (newToken, username) => {
    setToken(newToken);
    setUser({ username });
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', username);
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);