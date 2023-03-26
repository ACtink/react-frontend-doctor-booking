import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { Box, Card, CardContent, CardHeader } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormControl, FormHelperText, InputLabel } from "@material-ui/core";
import { MenuItem, Select } from "@material-ui/core";
import { getData, postData } from "../../util/fetch";
import { Button } from "@material-ui/core";

Modal.setAppElement("#root");

function BookAppointment(props) {
  const {
    bookAppointment,
    setBookAppointment,
    selectedDoctor,
    isLoggedIn,
    setIsLoggedIn,
  } = props;

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isTimeSlotSelected, setIsTimeSlotSelected] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [priorMedicalHistory, setPriorMedicalHistory] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlots = (e) => {
    setSelectedTime(e.target.value);
  };

  const fetchAvailableSlots = async () => {
    if (
      selectedDoctor === null ||
      selectedDoctor === undefined ||
      selectedDoctor.id === undefined
    ) {
      return;
    }
    const date = selectedDate.toISOString().split("T")[0];

    // fetching timeslots for a particular date selected by the user
    let response = await getData(
      "doctors/" + selectedDoctor.id + "/timeSlots?date=" + date
    );

    if (response.status === 200) {
      response = await response.json();
      setAvailableSlots(response.timeSlot);
      setSelectedTime("");
    } else {
      const error = response.json();
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate, selectedDoctor.id]);

  useEffect(() => {
    if (selectedTime === "") {
      setIsTimeSlotSelected(false);
    } else setIsTimeSlotSelected(true);
  }, [selectedTime]);


  // calling the bookAppointment api to book the appointment

  const bookAppointmentApiCaller = async () => {
    if (isTimeSlotSelected === false) {
      return;
    }
    const data = {
      doctorId: selectedDoctor.id,
      doctorName: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
      userId: sessionStorage.getItem("uuid"),
      userEmailId: sessionStorage.getItem("uuid"),
      timeSlot: selectedTime,
      appointmentDate: selectedDate.toISOString().split("T")[0],
      symptoms: symptoms,
      priorMedicalHistory: priorMedicalHistory,
    };
    let response = await postData("appointments", data);

    if (response.status === 200) {
      alert("Appointment Booked Successfully");
      setBookAppointment(false);
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  // creating the fields for the user to enter the details for booking the appointment
  return (
    <div>
      <Modal
        className="mymodal"
        isOpen={bookAppointment}
        onRequestClose={() => {
          setBookAppointment(false);
        }}
      >
        <Card variant="elevation">
          <CardHeader
            title="Book An Appointment"
            style={{
              backgroundColor: "purple",
              color: "white",
              height: 70,
              padding: 11,
            }}
          ></CardHeader>

          <CardContent>
            <Box sx={{ width: 500, height: 500 }}>
              <TextField
                id="standard-required"
                label="DoctorName"
                variant="standard"
                required
                disabled
                defaultValue={`${selectedDoctor.firstName} ${selectedDoctor.lastName} `}
              />
              <br></br>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="inline"
                  disablePast
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker"
                  label="Date Picker"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <br></br>

              <FormControl>
                <InputLabel id="demo-simple-select-helper-label" shrink>
                  Time Slot
                </InputLabel>
                <Select
                  value={selectedTime}
                  label="Time Slot"
                  onChange={handleTimeSlots}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {availableSlots.map((slots) => {
                    return (
                      <MenuItem value={slots} key={slots}>
                        {" "}
                        {slots}
                      </MenuItem>
                    );
                  })}
                </Select>
                {isTimeSlotSelected === false && (
                  <FormHelperText error>
                    <span>Select a time slot </span>
                  </FormHelperText>
                )}
              </FormControl>

              <br></br>
              <FormControl>
                <TextField
                  id="standard-textarea"
                  label="Medical History"
                  placeholder="past illness"
                  multiline
                  variant="standard"
                  rows={4}
                  onChange={(e) => {
                    setPriorMedicalHistory(e.target.value);
                  }}
                />
              </FormControl>
              <br></br>
              <FormControl>
                <TextField
                  id="standard-textarea"
                  label="Symptoms"
                  placeholder="ex Cold , Swelling etc"
                  multiline
                  variant="standard"
                  rows={4}
                  onChange={(e) => {
                    setSymptoms(e.target.value);
                  }}
                />
              </FormControl>
              <br></br>

              <Box mt={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (isLoggedIn) {
                      bookAppointmentApiCaller();
                    }
                  }}
                >
                  BOOK APPOINTMENT
                </Button>
              </Box>
              <br></br>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}

export default BookAppointment;
