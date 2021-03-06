import React, { useState, useEffect } from "react";
import {
  Tab,
  Button,
  TextField,
  Container,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";

import { TabList, TabContext, TabPanel } from "@mui/lab";
import ApiService from "../ApiService";
import { useParams, useNavigate } from "react-router-dom";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import ConfirmationDialogRaw from "./loginDialog";

// main

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState();
  const [tabs, setTabs] = useState([]);
  const [tabName, set_tabName] = useState();
  const [tabDesc, set_desc] = useState();

  const { userName } = useParams();
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

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
      .then((resp) => setSelectedTab(tabs[tabs.length - 1].id));
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

  return (
    <Container maxWidth="mx">
      <AppBar
        position="static"
        sx={{
          flexGrow: 1,
          fontFamily: "Monospace",
          mr: 1.5,
          ml: 1.5,
        }}
      >
        <Toolbar
          sx={{
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Monospace",
              mr: 1.5,
              ml: 1.5,
              mt: 0.5,
              mb: 0.5,
              p: 0.5,
            }}
            onClick={() => navigate(`/`)}
          >
            TextAnywhere
          </Typography>
          <Typography
            variant="body"
            component="div"
            sx={{
              flexGrow: 1.5,
              fontFamily: "Monospace",
              mr: 1.5,
              ml: 1.5,
              mt: 0.5,
              mb: 0.5,
              p: 0.5,
            }}
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
          sx={{
            color: "red",
            m: 0.05,
          }}
        >
          {tabs
            .filter((it) => it.userName === userName)
            .map((tab) => (
              <Tab
                icon={
                  <DeleteOutlineOutlinedIcon
                    size="small"
                    onClick={(e) => handleTabClose(tab.id)}
                    sx={{
                      fill: "red",
                      width: "0.8em",
                    }}
                  />
                }
                selected={true}
                iconPosition="end"
                sx={
                  {
                    // minWidth: "fit-content",
                  }
                }
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
                required
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
      <ConfirmationDialogRaw
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </Container>
  );
}
