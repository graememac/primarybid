import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { RouteComponentProps } from "@reach/router";
import Alert from "@mui/material/Alert";
import { navigate } from "@reach/router";

const AUTH_API_ENDPOINT = "https://fakestoreapi.com/auth/login";

const SignIn = (props: RouteComponentProps) => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("authToken", "");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // https://fakestoreapi.com/auth/login API is returning a 524 error status code even if the username/password
    // is valid.  To get around this issue I will set a fake token then redirect to /categories. I have
    // commented out the code below which would make a real auth request and deal with the response.

    if (username === "username" && password === "password") {
      localStorage.setItem("authToken", "fake-token");
      navigate("/categories");
    } else {
      setError("Invalid username/ password");
    }

    // try {
    //   const response = await fetch(AUTH_API_ENDPOINT, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       username,
    //       password,
    //     }),
    //   });
    //   const results = await response.json();

    //   if (results.token) {
    //     localStorage.setItem("authToken", results.token);
    //     navigate("/categories");
    //   } else {
    //     setError("Invalid username/ password");
    //   }
    // } catch (error) {
    //   setError("Something went wrong.  Please contact support@primarybid.com");
    // }
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && <Alert severity="error">{error}</Alert>}

      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="enter"
            autoFocus
            data-testid="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            data-testid="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Box>

      <Alert severity="info">Username: "username", password: "password"</Alert>
    </Container>
  );
};

export default SignIn;
