import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link as RouterLink,} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export default function Login() {
  // const history = useHistory();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:4000/users/login/123', loginData);
      
      if (response.status === 200) {
        // Handle successful login
        console.log('Login successful:', response.data);
        // Save the token and redirect to another page
        localStorage.setItem('token', response.data.token);
        // history.push('/dashboard'); // Example redirect
      } else {
        // Handle login error
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Server error');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3">
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate width={1000}>
            <TextField
            margin='normal'
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
            />
            <TextField
            margin='normal'
              required
              fullWidth
              
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /><br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,width:500,}}
            >
              Login
            </Button><br/>
            <Grid container>
              <Grid item xs>
                <RouterLink to="#" variant="body2">
                  Forgot password?
                </RouterLink>
                <RouterLink to="/signupform" variant="body2" margin={10}>
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
              <Grid item>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

