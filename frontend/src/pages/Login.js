// Create this file: frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '../api/dealsApi'; // Assuming loginUser is in dealsApi.js

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px); /* Account for header height */
  background-color: #f4f7fc;
  padding: 20px;
`;

const LoginForm = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const Button = styled.button`
  background: #4361ee;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background 0.2s ease;

  &:hover {
    background: #3a56d4;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ForgotPassword = styled.div`
  margin-top: 15px;
  font-size: 14px;
  a {
    color: #4361ee;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUpLink = styled.div`
  margin-top: 25px;
  font-size: 14px;
  color: #666;
  a {
    color: #4361ee;
    font-weight: 600;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin-bottom: 20px;
  font-weight: 500;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser({ email, password });
      if (response.token) {
        // Token is already set in dealsApi.js interceptor, but we can re-confirm here if needed
        // localStorage.setItem('token', response.token);
        // localStorage.setItem('currentUser', JSON.stringify(response.user)); // Assuming response includes user data
        navigate('/'); // Redirect to dashboard on successful login
      } else {
        setError(response.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Title>Deal Manager Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </FormGroup>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <ForgotPassword>
          <Link to="/forgot-password">Forgot Password?</Link> {/* Placeholder */}
        </ForgotPassword>
        <SignUpLink>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </SignUpLink>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
