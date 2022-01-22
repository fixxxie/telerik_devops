import React from "react";
import { withSnackbar, WithSnackbarProps } from "notistack";

import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import AppContext from "../context/App";

const theme = createTheme();

type Props = {} & WithSnackbarProps;
interface State {
  email: string;
  password: string;
}

class Login extends React.Component<Props, State> {
  static contextType = AppContext;

  constructor(props: Props) {
    super(props);

    this.state = { email: "", password: "" };
  }

  handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.context.api
      .login(this.state.email, this.state.password)
      .then((user: any) => {
        this.context.setAuthenticated(user);
        this.context.navigate("/");
      })
      .catch((response: any) => {
        this.props.enqueueSnackbar("Invalid credentials.", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
      });
  };

  handleEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state, props) => {
      return { email: ev.target.value };
    });
  };

  handlePasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state, props) => {
      return { password: ev.target.value };
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              DevOps Proof Of Concept
            </Typography>
            <Box
              component="form"
              onSubmit={this.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleEmailChange}
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
                onChange={this.handlePasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withSnackbar(Login);
