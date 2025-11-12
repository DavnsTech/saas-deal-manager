import React, { useState } from 'react';
import './Login.css'; // Assuming Login.css for styling

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // TODO: Implement actual login logic here
    // This would typically involve calling an authentication API
    console.log('Attempting to log in with:', { username, password });
    // Example:
    // try {
    //   const response = await authApi.login({ username, password });
    //   // Store token, user info, and redirect
    //   localStorage.setItem('token', response.token);
    //   // Redirect logic...
    // } catch (err) {
    //   setError('Login failed. Please check your credentials.');
    // }

    // Placeholder for successful login redirection
    alert('Login successful! (Placeholder)');
    // window.location.href = '/dashboard'; // Or use React Router navigate
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
