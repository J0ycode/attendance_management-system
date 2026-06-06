import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Avatar
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const LoginPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/login`, {
        username,
        password,
        role: activeTab,
      });
      onLogin(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials or incorrect role selected.');
      } else {
        setError('Failed to connect to the server. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Login Card Container */}
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            backgroundColor: 'rgba(30, 41, 59, 0.7)', // Slate 800 semi-transparent
            backdropFilter: 'blur(16px)', // Glassmorphism backdrop filter
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 56,
                height: 56,
                mb: 1.5,
              }}
            >
              <AssignmentIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" component="h1" fontWeight="800" color="text.primary">
              AttendanceMS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Attendance Management System
            </Typography>
          </Box>

          {/* Role Tabs */}
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              aria-label="login roles"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Student" value="student" sx={{ textTransform: 'capitalize', fontWeight: 600 }} />
              <Tab label="Faculty" value="faculty" sx={{ textTransform: 'capitalize', fontWeight: 600 }} />
              <Tab label="Admin" value="admin" sx={{ textTransform: 'capitalize', fontWeight: 600 }} />
            </Tabs>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 1,
                py: 1.5,
                borderRadius: 2.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                `Sign In as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
