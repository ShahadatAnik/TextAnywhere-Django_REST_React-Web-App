import React, { useState, useEffect } from "react";
import ApiService from "../ApiService";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Button,
  TextField,
  Container,
  Box,
  Typography,
} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import LinkIcon from "@mui/icons-material/Link";

export default function Home() {
  const [user, set_user] = useState();
  const [canGo, set_canGo] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/ta/info/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => set_user(resp))
      .catch((error) => console.log(error));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (canGo) {
      ApiService.NewUser({
        userName,
        password,
      })
        .then((resp) => set_user([...user, resp]))
        .then(navigate(`/${userName}`));
    }
  };

  //
  const [errorText, setErrorText] = React.useState();

  const [userName, set_userName] = useState("");
  const [url, set_url] = useState("");
  const [password, set_password] = useState("");

  const onChangeUserName = (event) => {
    if (user.filter((u) => u.userName === event.target.value).length < 1) {
      setErrorText("");
      set_canGo(true);
      set_userName(event.target.value);
    } else {
      setErrorText("Url Already Taken");
      set_canGo(false);
      set_userName(event.target.value);
    }
  };

  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{
        fontWeight: "bold",
        fontSize: "h4.fontSize",
        fontFamily: "Monospace",
        flexGrow: 1,
        textAlign: "center",
      }}
      id="wave"
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <Grid
          item
          xs={3}
          sx={{
            color: "primary.main",
            borderRight: 3,
            borderTop: 3,
            borderRadius: "8px",
            p: 5,
          }}
        >
          <Typography
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: "h4.fontSize",
              fontFamily: "Monospace",
              flexGrow: 1,
              textAlign: "center",
              color: "primary.main",
              borderLeft: 3,
              borderBottom: 3,
              borderRadius: "8px",
              mb: 5,
            }}
          >
            TextAnywhere
          </Typography>
          <form validate="true" onSubmit={handleSubmit} autoComplete="off">
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  required
                  variant="standard"
                  type="text"
                  sx={{ flexGrow: 1, fontFamily: "Monospace" }}
                  helperText={errorText}
                  error={errorText}
                  onChange={onChangeUserName}
                  value={userName}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  required
                  variant="standard"
                  type="text"
                  sx={{ flexGrow: 1, fontFamily: "Monospace" }}
                  onChange={(event) => set_password(event.target.value)}
                  value={password}
                />
              </Box>
              <Button
                variant="contained"
                type="submit"
                sx={{ flexGrow: 1, mb: 5 }}
              >
                Registration
              </Button>
            </Box>
          </form>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 10 }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography
                      sx={{
                        fontFamily: "Monospace",
                        color: "primary.main",
                      }}
                    >
                      www.TextAnywhere.com/
                    </Typography>
                  </InputAdornment>
                ),
              }}
              required
              variant="standard"
              type="text"
              sx={{ flexGrow: 0.05, mr: 1 }}
              onChange={(event) => set_url(event.target.value)}
              value={url}
            />
            <Button
              variant="contained"
              onClick={() => navigate(`/${url}`)}
              sx={{ flexGrow: 1 }}
            >
              Go
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
