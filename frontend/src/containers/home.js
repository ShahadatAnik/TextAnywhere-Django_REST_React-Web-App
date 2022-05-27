import React, { useState, useEffect } from "react";
import ApiService from "../ApiService";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import LinkIcon from "@mui/icons-material/Link";

export default function Home() {
  const [newUser, set_newUser] = useState();
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
      .then((resp) => set_newUser(resp))
      .catch((error) => console.log(error));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (canGo) {
      ApiService.NewUser({
        userName,
        password,
      }).then(navigate(`/${userName}`));
    }
  };

  //
  const [errorText, setErrorText] = React.useState();

  const [userName, set_userName] = useState("");
  const [password, set_password] = useState("");

  const onChangeUserName = (event) => {
    if (newUser.filter((u) => u.userName === event.target.value).length < 1) {
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
    <form validate="true" onSubmit={handleSubmit} autoComplete="off">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                </InputAdornment>
              ),
            }}
            required
            variant="standard"
            type="text"
            sx={{ flexGrow: 0.05, mr: 2 }}
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
            sx={{ flexGrow: 0.05 }}
            onChange={(event) => set_password(event.target.value)}
            value={password}
          />
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{ flexGrow: 0.05, p: 0.05 }}
        >
          Login
        </Button>
      </Box>
    </form>
  );
}
