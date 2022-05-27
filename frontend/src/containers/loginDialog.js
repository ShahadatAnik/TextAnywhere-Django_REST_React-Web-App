import { useState, useEffect } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useParams, useNavigate } from "react-router-dom";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const [userInfo, set_userInfo] = useState([]);
  let navigate = useNavigate();

  const { userName } = useParams();

  useEffect(() => {
    if (open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/ta/info/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => set_userInfo(resp))
      .catch((error) => console.log(error));
  }, []);

  const handleOk = () => {
    const [user] = userInfo.filter((it) => it.userName === userName);
    if (user.password === value) {
      onClose(value);
    } else {
      handleClick();
    }
    if (user.length() < 0) {
      // need to fix
      alert("Wrong address");
    }

    // console.log("")
  };

  // snakbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 500,
          boxShadow: 3,
          justifyContent: "center",
        },
        backdropFilter: "blur(5px)",
      }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: "h4.fontSize",
          fontFamily: "Monospace",
          flexGrow: 1,
          textAlign: "center",
          color: "error.main",
        }}
      >
        Password Required
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontFamily: "Monospace" }}
        >
          This site is already occupied.
          <br />
          <br /> If this is your site enter the password, or{" "}
          <Button variant="contained" onClick={() => navigate(`/`)}>
            {" "}
            Register Here
          </Button>
          <br />
        </Typography>
      </DialogContent>
      <DialogActions>
        <TextField
          variant="outlined"
          size="medium"
          fullWidth
          type="password"
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <Button
          variant="contained"
          color="success"
          sx={{ ml: 2 }}
          onClick={handleOk}
          // onKeyPress={(e) => {
          //   if (e.key === "Enter") {
          //     handleOk();
          //   }
          // }}
        >
          ENTER
        </Button>
      </DialogActions>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Wrong Password"
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function ConfirmationDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    if (newValue) {
      setValue(newValue);
    }
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    handleClickListItem();
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {};

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ConfirmationDialogRaw
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </Box>
  );
}
