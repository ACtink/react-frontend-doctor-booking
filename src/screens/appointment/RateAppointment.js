import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import {
  FormControl,
  FormHelperText,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { postData } from "../../util/fetch";

const useStyles = makeStyles({
  paper: {
    margin: 15,
    textAlign: "left",
    padding: 20,
    cursor: "pointer",
  },
  cardHeader: {
    backgroundColor: "purple",
    height: 70,
    padding: 11,
    color: "white",
  },
  errorColor: {
    color: "red",
  },
});

Modal.setAppElement("#root");

const backendurl = process.env.REACT_APP_BACKEND_URL;

function RateAppointment(props) {
  const { rateAppointment, setRateAppointment, selectedAppointment } = props;

  const classes = useStyles();

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [isRatingSubmittedError, setIsRatingSubmittedError] = useState(false);

  function ratingHandler(e) {
    setRating(e.target.value);
  }

  function commentsHandler(e) {
    setComments(e.target.value);
  }

  useEffect(() => {
    if (rating < 1) {
      setIsRatingSubmittedError(true);
    } else {
      setIsRatingSubmittedError(false);
    }
  }, [rating]);

  // calling the rating api for giving the rating to a particular doctor selected

  async function RateAppointmentApiCaller() {
    if (isRatingSubmittedError) {
      return;
    }
    const data = {
      appointmentId: selectedAppointment.appointmentId,
      doctorId: selectedAppointment.doctorId,
      rating: rating,
      comments: comments,
    };
    const response = await postData(`${backendurl}/ratings`, data);
    if (response.status === 200) {
      setRateAppointment(false);

      alert("Appointment rated successfully");
    } else {
      const error = await response.json();
      if (error.root_cause.includes("Already Rated")) {
        alert("Appointment already rated");
      } else {
        alert(error.message);
      }
    }
  }

  // creating rate appointment fields for the user to enter the rating and comments
  return (
    <div>
      <Modal
        className="mymodal"
        overlayClassName="myoverlay"
        isOpen={rateAppointment}
        onRequestClose={() => {
          setRateAppointment(false);
        }}
      >
        <Card variant="elevation">
          <CardHeader
            title="Rate Appointment"
            style={{
              backgroundColor: "purple",
              color: "white",
              height: 70,
              padding: 11,
            }}
          ></CardHeader>

          <CardContent>
            <Box sx={{ width: 700, height: 250 }}>
              <FormControl>
                <TextField
                  id="standard-textarea"
                  label="Comments"
                  placeholder="great experience"
                  multiline
                  rows={3}
                  margin="normal"
                  onChange={commentsHandler}
                />
              </FormControl>
              <br></br> <br></br>
              <Typography variant="h6" component="h6">
                Rating :
                <Rating
                  value={rating}
                  max={5}
                  name="unique-rating"
                  onChange={ratingHandler}
                />
              </Typography>
              {isRatingSubmittedError && (
                <FormHelperText>
                  <span className={classes.errorColor}>Submit a rating</span>
                </FormHelperText>
              )}
              <br></br>
              <br></br>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={RateAppointmentApiCaller}
              >
                RATE APPOINTMENT
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}

export default RateAppointment;
