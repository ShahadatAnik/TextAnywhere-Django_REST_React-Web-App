import React, { useState, useEffect } from "react";
import { Tab, Grid, Button, TextField } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import ApiService from "../ApiService";
import { useParams } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState();
  const [tabs, setTabs] = useState([]);
  const [desc, set_desc] = useState();

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
    }).then((resp) => setTabs([...tabs, resp]));
    setSelectedTab(tabs[0].id);
  };

  // update tab
  const updatedInformation = (new_) => {
    const new_userList = tabs.map((old_) => {
      if (new_.id === old_.id) {
        return new_;
      } else {
        return old_;
      }
    });

    setTabs(new_userList);
  };

  const updateTab = (tab_id) => {
    ApiService.UpdateTab(tab_id, {
      desc,
    })
      .then((resp) => updatedInformation(resp))
      .catch((error) => console.log(error));
    setSelectedTab(tabs[0].id);
  };

  //delete tab
  const deleteBtn = (value) => {
    const tabArr = tabs.filter((x) => x.id !== value);
    setTabs(tabArr);
    setSelectedTab(tabs[0].id);
  };

  const handleTabClose = (value) => {
    ApiService.DeleteTab(value)
      .then(() => deleteBtn(value))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {tabs.map((d) => (
        <div key={d.id}>
          {d.userName}, {d.tabName}
        </div>
      ))}

      <TabContext value={selectedTab}>
        <Grid item xs={12} md={6}>
          <Button onClick={newTab} variant="contained" color="primary">
            New Tab
          </Button>
        </Grid>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {tabs
            .filter((it) => it.userName === userName)
            .map((tab) => (
              <Tab
                icon={
                  <CloseIcon
                    color="danger"
                    onClick={(e) => handleTabClose(tab.id)}
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
                variant="filled"
                multiline
                value={panel.tabDesc}
                onChange={(e) => set_desc(e.target.value)} // not working
              />

              <Button
                size="large"
                variant="contained"
                endIcon={<SendRoundedIcon />}
                type="submit"
                className=" rounded-3 text-white fw-bold fs-4"
                onClick={() => updateTab(panel.id)}
              >
                Save
              </Button>
            </TabPanel>
          ))}
      </TabContext>
    </div>
  );
}
