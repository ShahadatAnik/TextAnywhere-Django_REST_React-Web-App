import React, { useState, useEffect } from "react";
import {
  Tab,
  Grid,
  Button,
  TextField,
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import PropTypes from "prop-types";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import ApiService from "../ApiService";
import { useParams } from "react-router-dom";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import Snackbar from "./snackbars";
// import ConfirmationDialogRaw from "./loginDialog";
import { width } from "@mui/system";

const initBeforeUnLoad = (showExitPrompt) => {
  window.onbeforeunload = (event) => {
    // Show prompt based on state
    if (showExitPrompt) {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    }
  };
};

//pop up
function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleOk = () => {
    onClose(value);
  };

  //   const handleChange = (event) => {
  //     setValue(event.target.value);
  //   };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 500 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Password Required</DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontFamily: "Monospace" }}
        >
          This site is already occupied.
          <br /> If this is your site enter the password, or you can try using
          different site.
        </Typography>
      </DialogContent>
      <DialogActions>
        <TextField
          variant="outlined"
          size="large"
          fullWidth
          autoFocus={true}
          inputProps={{ style: { fontSize: 15 } }}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          validation
        />
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

// main

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState();
  const [tabs, setTabs] = useState([]);
  const [tabName, set_tabName] = useState();
  const [tabDesc, set_desc] = useState();

  const [openSnackbar, set_OpenSnackbar] = useState(false);
  const [type, set_Type] = useState("");

  const { userName } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/ta/tab/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setTabs(resp))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    set_desc(newValue.tabDesc);
    set_tabName(newValue.tabName);
  };

  // new tab
  const newTab = () => {
    ApiService.NewTab({
      userName,
    })
      .then((resp) => setTabs([...tabs, resp]))
      .then((resp) => setSelectedTab(resp.id));
  };

  // update tab
  const updatedInfo = (new_) => {
    const new_List = tabs.map((old_) => {
      if (new_.id === old_.id) {
        return new_;
      } else {
        return old_;
      }
    });

    setTabs(new_List);
    // set_OpenSnackbar(!openSnackbar);
    // set_Type("update");
  };

  const updateTab = (tab_id) => {
    ApiService.UpdateTab(tab_id, {
      tabName,
      tabDesc,
    })
      .then((resp) => updatedInfo(resp))
      .catch((error) => console.log(error));
    setSelectedTab(tab_id);
  };

  //delete tab
  const deleteInfo = (value) => {
    const tabArr = tabs.filter((x) => x.id !== value);
    setTabs(tabArr);
    setSelectedTab(tabs[0].id);
    // set_OpenSnackbar(!openSnackbar);
    // set_Type("delete");
  };

  const handleTabClose = (value) => {
    ApiService.DeleteTab(value)
      .then(() => deleteInfo(value))
      .catch((error) => console.log(error));
  };
  // const styles = {
  //   input: {
  //     color: "white",
  //   },
  // };
  // InputProps={{ style: styles.input }}
  const [showExitPrompt, setShowExitPrompt] = useState(false);

  window.onload = function () {
    initBeforeUnLoad(showExitPrompt);
  };

  // Re-Initialize the onbeforeunload event listener
  useEffect(() => {
    initBeforeUnLoad(showExitPrompt);
  }, [showExitPrompt]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (performance.navigation.type === 1) {
      setOpen(false);
    } else {
      setOpen(false);
    }
  });

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Container maxWidth="mx">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Monospace" }}
          >
            TextAnywhere
          </Typography>
          <Typography
            variant="body"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Monospace" }}
          >
            "Save Before Jump Into Another Tab"
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="success"
            endIcon={<AddOutlinedIcon />}
            onClick={newTab}
            center
          >
            ADD
          </Button>
        </Toolbar>
      </AppBar>

      <TabContext value={selectedTab}>
        <TabList
          aria-label="full width tabs example"
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs
            .filter((it) => it.userName === userName)
            .map((tab) => (
              <Tab
                icon={
                  <DeleteOutlineOutlinedIcon
                    onClick={(e) => handleTabClose(tab.id)}
                    style={{
                      color: "red",
                    }}
                  />
                }
                selected={true}
                iconWrapper={true}
                wrapped
                fullWidth={true}
                iconPosition="end"
                sx={{ minWidth: "fit-content" }}
                key={tab.id}
                label={tab.tabName}
                value={tab.id}
              />
            ))}
        </TabList>
        {tabs
          .filter((it) => it.userName === userName)
          .map((panel) => (
            <TabPanel key={panel.id} value={panel.id}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                multiline
                minRows={10}
                maxRows={20}
                autoFocus={true}
                inputProps={{ style: { fontSize: 15 } }}
                defaultValue={panel.tabDesc}
                onChange={(e) => {
                  set_desc(e.target.value);
                  if (e.target.value.length > 9) {
                    set_tabName(tabName.slice(0, 9) + "...");
                  } else set_tabName(e.target.value);
                }}
              />
              <br /> <br />
              <Button
                size="large"
                variant="contained"
                endIcon={<SendRoundedIcon />}
                type="submit"
                className=" rounded-3 text-white fw-bold fs-4"
                onClick={() => updateTab(panel.id)}
                style={{ width: "100%" }}
                sx={{ flexGrow: 1 }}
              >
                Save
              </Button>
            </TabPanel>
          ))}
      </TabContext>
      {openSnackbar ? <Snackbar type={type} /> : null}
      <ConfirmationDialogRaw
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </Container>
  );
}
