import React, { useState, useEffect } from "react";
import { Tab, Grid, Button, TextField, IconButton } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import ApiService from "../ApiService";
import { useParams } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import Snackbar from "./snackbars";

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState();
  const [tabs, setTabs] = useState([]);
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
  };

  // new tab
  const newTab = () => {
    ApiService.NewTab({
      userName,
    })
      .then((resp) => setTabs([...tabs, resp]))
      .then((resp) => setSelectedTab(resp.id));
    // set_OpenSnackbar(!openSnackbar);
    // set_Type("insert");
  };

  // update tab
  const updatedInformation = (new_) => {
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
      tabDesc,
    })
      .then((resp) => updatedInformation(resp))
      .catch((error) => console.log(error));
    setSelectedTab(tab_id);
  };

  //delete tab
  const deleteBtn = (value) => {
    const tabArr = tabs.filter((x) => x.id !== value);
    setTabs(tabArr);
    setSelectedTab(tabs[0].id);
    // set_OpenSnackbar(!openSnackbar);
    // set_Type("delete");
  };

  const handleTabClose = (value) => {
    ApiService.DeleteTab(value)
      .then(() => deleteBtn(value))
      .catch((error) => console.log(error));
  };
  // const styles = {
  //   input: {
  //     color: "white",
  //   },
  // };
  // InputProps={{ style: styles.input }}

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        endIcon={<AddOutlinedIcon />}
        onClick={newTab}
        center
      >
        ADD
      </Button>
      <TabContext value={selectedTab}>
        <TabList
          aria-label="full width tabs example"
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {" "}
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
                iconPosition="end"
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
                fullWidth
                multiline
                rows={21}
                defaultValue={panel.tabDesc}
                onChange={(e) => set_desc(e.target.value)}
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
              >
                Save
              </Button>
            </TabPanel>
          ))}
      </TabContext>
      {openSnackbar ? <Snackbar type={type} /> : null}
    </div>
  );
}
