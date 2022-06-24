import React from "react";
import { Button, Box, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Link from "./Link";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/home", { replace: true });
  };

  return (
    <div id="base">
      <Box id="form-box">
        <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={3} id="form-container">
            <Grid item>
              <h2>Login</h2>
            </Grid>
            <Grid item>
              <TextField label="Email" type="email" variant="outlined" fullWidth />
            </Grid>
            <Grid item>
              <TextField label="Password" type="password" variant="outlined" fullWidth />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <p>
                New here? <Link to="/signup">Create an account</Link>
              </p>
              <p>
                Or try out a <Link to="/home">Demo Account</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Login;
