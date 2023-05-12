import { Button, Typography, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getData } from "../../util/fetch";
import { makeStyles } from "@material-ui/core/styles";
import RateAppointment from "./RateAppointment";

const useStyles = makeStyles({
  paper: {
    margin: 15,
    padding: 15,
  },
});

function Appointment(props) {
  const { isLoggedIn } = props;

  const classes = useStyles();

  const [userAppointments, setUserAppointments] = useState([]);

  const [rateAppointment, setRateAppointment] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState({});

  const [ loading , setLoading] = useState(false)

  const userId = sessionStorage.getItem("uuid");



  const backendurl = process.env.REACT_APP_BACKEND_URL;

  // fetching all the appointments for a particular user with the help of userId

  async function getUserAppointments() {
    const response = await getData(`${backendurl}/users/${userId}/appointments`);

    if (response.status === 200) {
      const appointments = await response.json();
      setUserAppointments(appointments);
      setLoading(false)
      
    } else {
      alert("There is a problem with fetching of user appointments");
    }
  }

  useEffect(() => {
    if (isLoggedIn) {

      setLoading(true)

      getUserAppointments();
    }
  }, [isLoggedIn]);


  // creating the appointments lists for the user

  return (
    <div>
      <RateAppointment
        rateAppointment={rateAppointment}
        setRateAppointment={setRateAppointment}
        selectedAppointment={selectedAppointment}
      />

      {isLoggedIn &&
        userAppointments.length !== 0 &&
        userAppointments.map((appointment) => {
          return (
            <Paper
              elevation={4}
              className={classes.paper}
              key={appointment.appointmentId}
            >
              {" "}
              <Typography gutterBottom>
                Dr : {appointment.doctorName}
              </Typography>
              <br></br>
              <Typography>
                Date : {appointment.appointmentDate}
                <br></br>
                Symptoms : {appointment.symptoms}
                <br></br>
                Prior Medical History : {appointment.priorMedicalHistory}
              </Typography>
              <br></br>
              <Button
             
               
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setRateAppointment(true);
                }}
              >
                RATE APPOINTMENT
              </Button>
              <br></br>
            </Paper>
          );
        })}
      <center>{!isLoggedIn && <h3>Login to see appointments</h3>}</center>

      <center>
        {isLoggedIn && userAppointments.length === 0 && !loading ? (
          <h3>You Have Not Booked Any Apppointment.</h3>
        ): loading && <h3>Loading...</h3>}
      
      </center>
    </div>
  );
}

export default Appointment;
