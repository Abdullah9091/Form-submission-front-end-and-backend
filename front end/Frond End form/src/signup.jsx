import React, { useState } from 'react'; // Importing React and the useState hook
import { Button, Avatar, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material'; // Importing components from Material-UI
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Importing theme-related functions from Material-UI
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate from react-router-dom for navigation
import axios from 'axios'; // Importing axios for making HTTP requests

// Function to handle user submission to the server
const submitUser = async (formData) => {
  try {
    // Sending a POST request to the server with user data
    const response = await axios.post('http://localhost:4000/users/submit', {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      password: formData.password,
    });
    // Alerting success message and logging the server response
    alert('Congratulations, saved successfully');
    console.log(response.data);
  } catch (error) {
    // Alerting error message and logging the error
    alert('Error saving user');
    console.error(error.response ? error.response.data : error.message);
  }
};

// Main component for the sign-up form
function SignUp() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    allowExtraEmails: false,
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // Handle changes in form fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target; // Destructuring event target properties
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Setting form data based on input type
    });
  };

  // Validate form fields
  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors); // Setting validation errors
    return Object.keys(tempErrors).length === 0; // Returning validation status
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Preventing default form submission
    if (validate()) {
      await submitUser(formData); // Submitting user data if validation passes

      // Resetting form fields after submission (optional)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        allowExtraEmails: false,
      });
      setErrors({}); // Clearing errors
    }
  };

  const defaultTheme = createTheme(); // Creating a default theme

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs"> {/* Container for the form */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> {/* Placeholder for an avatar icon */}
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5"> {/* Form heading */}
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> {/* Form element */}
            <Grid container spacing={2}> {/* Grid container for form fields */}
              <Grid item xs={20} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox
                    checked={formData.allowExtraEmails}
                    onChange={handleChange}
                    name="allowExtraEmails"
                    color="primary"
                  />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={() => { navigate("/login") }} // Navigate to login page
            >
              Log in
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={() => { navigate("/show") }} // Navigate to table data page
            >
              See Table Data
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2"> {/* Link to sign-in page */}
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
