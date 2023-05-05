import React from "react";

import { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";
import Header from "../../common/header/Header";

function Home() {
  const [tabIndex, setTabIndex] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("access-token") != null
  );

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Header>

      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Doctors" />
        <Tab label="Appointments" />
      </Tabs>

      {tabIndex === 0 && (
        <DoctorList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      {tabIndex === 1 && <Appointment isLoggedIn={isLoggedIn} />}
    </div>
  );
}

export default Home;
