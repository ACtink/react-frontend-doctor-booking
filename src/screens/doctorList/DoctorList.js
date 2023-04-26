import { FormControl, FormHelperText, Paper } from "@material-ui/core";
import React ,{ useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { MenuItem, InputLabel, Select } from "@material-ui/core";
import { getData } from "../../util/fetch";
import { Rating } from "@material-ui/lab";
import BookAppointment from "./BookAppointment";
import DoctorDetails from "./DoctorDetails";

const useStyles = makeStyles({
  paper: {
    width: "40%",
    display: "block",
    justifyContent: "center",
    height: 150,
    margin: 20,
    textAlign: "left",
    padding: 20,
    cursor: "pointer",
  },
  bookAppointmentButton: {
    width: "40%",
    margin: "10px",
  },
  viewDetailsButton: {
    backgroundColor: "green",
    width: "40%",
    margin: "10px",
  },
  docDetailsCardHeader: {
    margin: 0,
    textAlign: "left",
    padding: 0,
    cursor: "pointer",
    border: 0,
  },
  docDetailsModal: {
    border: 0,
    padding: 0,
    margin: 0,
    color: "white",
  },
});

function DoctorList(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const classes = useStyles();
  const [value, setValue] = useState("");

 
  const getAllDoctorsEndPoint = "/doctors";

  const [speciality, setSpeciality] = useState("");

  const [bookAppointment, setBookAppointment] = useState(false);

  const [doctors, setDoctors] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState({});

  const [showDoctorDetails, setShowDoctorDetails] = useState(false);


  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    setSpeciality(e.target.value);
  };



// function to fetch the list of all the doctors

  async function getDoctorsList() {
    try{
    const response = await getData(
      getAllDoctorsEndPoint + "?speciality=" + speciality
    );

   
    
    if (response.status === 200) {
      const doctorList = await response.json();
      setDoctors(doctorList);
    } else {
      alert("There is a problem with fetching of doctors list data");
    }
  }catch(e){
    console.log(e + "hhhhhh")
  }
  }

 

  useEffect(() => {
    getDoctorsList();

    return () => {};
  }, [speciality]);


  // creating the doctorlist from the data received by calling doctors api
  return (
    <center>
      <div>
        <div>
          <br></br>

          <FormControl variant="filled">
            <InputLabel variant="standard">Speciality</InputLabel>
            <Select
              labelId="selectSpeciality"
              id="speciality"
              value={value}
              onChange={handleChange}
              autoWidth
            >
              <MenuItem value={"CARDIOLOGIST"}>CARDIOLOGIST</MenuItem>
              <MenuItem value={"GENERAL_PHYSICIAN"}>GENERAL_PHYSICIAN</MenuItem>
              <MenuItem value={"DENTIST"}>DENTIST</MenuItem>
              <MenuItem value={"PULMONOLOGIST"}>PULMONOLOGIST</MenuItem>
              <MenuItem value={"ENT"}>ENT</MenuItem>
              <MenuItem value={"GASTRO"}>GASTRO</MenuItem>
            </Select>
            <FormHelperText>Select by Speciality</FormHelperText>
          </FormControl>
        </div>
        <br></br>

        {doctors.map((doc) => {
          return (
            <Paper elevation={5} className={classes.paper} key={doc.id}>
              {" "}
              <Typography gutterBottom>
                Doctor Name : {doc.firstName} {doc.lastName}
              </Typography>
              <br></br>
              <Typography gutterBottom>
                Speciality : {doc.speciality}
                <br></br>
                Rating :
                <Rating
                  name="half-rating"
                  value={doc.rating}
                  precision={0.5}
                  readOnly
                />
              </Typography>
              <Typography gutterBottom>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.bookAppointmentButton}
                  onClick={() => {
                    if (isLoggedIn) {
                      setBookAppointment(true);
                      setSelectedDoctor(doc);
                    } else {
                      alert("please login to book the appointment");
                    }
                  }}
                >
                  {" "}
                  BOOK APPOINTMENT
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.viewDetailsButton}
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setShowDoctorDetails(true);
                  }}
                >
                  VIEW DETAILS
                </Button>
              </Typography>
            </Paper>
          );
        })}
      </div>
      <BookAppointment
        bookAppointment={bookAppointment}
        setBookAppointment={setBookAppointment}
        selectedDoctor={selectedDoctor}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      ></BookAppointment>

      <DoctorDetails
        selectedDoctor={selectedDoctor}
        showDoctorDetails={showDoctorDetails}
        setShowDoctorDetails={setShowDoctorDetails}
        classes={classes}
      ></DoctorDetails>
    </center>
  );
}

export default DoctorList;
