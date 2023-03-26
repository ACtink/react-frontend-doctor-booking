 //import { assertTSAnyKeyword } from '@babel/types';
import React from "react";
import "./Header.css";
import { Button } from "@material-ui/core";
import Modal from "react-modal";
import { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Login from "../../screens/login/Login";

import Register from "../../screens/register/Register";

const useStyles = makeStyles({
  headerButton: {
    float: "right",
    margin: 20,
  },
});

Modal.setAppElement("#root");

const Header = function (props) {
  const { isLoggedIn, setIsLoggedIn } = props;

  const classes = useStyles();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  function logoutHandler(e) {
    sessionStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <div>
      <div className="header">
        {!isLoggedIn && (
          <Button
            className={classes.headerButton}
            onClick={() => {
              setModalIsOpen(true);
            }}
            variant="contained"
            color="primary"
          >
            {" "}
            Login
          </Button>
        )}

        {isLoggedIn && (
          <Button
            className={classes.headerButton}
            variant="contained"
            color="secondary"
            onClick={logoutHandler}
          >
            {" "}
            Logout
          </Button>
        )}

        <img src="logo.jpeg" alt="Logo" />
        <h1>Doctor Finder</h1>
      </div>

      <Modal
        className="mymodal"
        overlayClassName="myoverlay"
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
      >
        <Card variant="elevation">
          <CardHeader title="Authentication" className="header"></CardHeader>

          <CardContent>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            {tabIndex === 0 && (
              <Login
                isLoggedIn={isLoggedIn}
                isOpen={modalIsOpen}
                setIsLoggedIn={setIsLoggedIn}
                setModalIsOpen={setModalIsOpen}
              />
            )}

            {tabIndex === 1 && (
              <Register
                setIsLoggedIn={setIsLoggedIn}
                setModalIsOpen={setModalIsOpen}
              />
            )}
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default Header;
