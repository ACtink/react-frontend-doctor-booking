import { FormControl, FormHelperText, Paper } from "@material-ui/core";
import React ,{ useEffect, useState } from "react";
import { makeStyles ,alpha } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { MenuItem, InputLabel, Select } from "@material-ui/core";
import { getData } from "../../util/fetch";
import { Rating } from "@material-ui/lab";
import BookAppointment from "./BookAppointment";
import DoctorDetails from "./DoctorDetails";
import * as dotenv from 'dotenv' 
dotenv.config()

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
    '@media (max-width: 730px)': {
      width: '60%',
      height:'200px',
      padding: '50px'
    },
    '@media (max-width: 3000px)': {
      width: '40%',
      height:'200px',
      padding: '50px'
    }
  },
  bookAppointmentButton: {
    width: '40%',
    '@media (min-width: 730px)': {
      width: '40%',
      marginLeft:'0%',
      marginRight:'7%',
      marginTop: '40px',
      fontSize:'15px',
      marginBottom:'8px'
    },  
    '@media (min-width: 808px)': {
      paddingTop:'17.5px',
      paddingBottom:'17.5px',


    }
  },
  
  viewDetailsButton: {
    backgroundColor: "green",
    width: "40%",
    margin: "10px",
    marginRight:"0px",
    
    '@media (min-width: 730px)': {
      width: '40%',
      marginRight:'0%',
      marginLeft:'7%',
      marginTop: '40px',
      paddingTop:'17.5px',
      paddingBottom:'14.5px',
      fontSize:'17px',
      marginBottom:'8px'
    }
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
  speciality:{ 
    '@media (min-width: 730px)': {
      marginBottom:'20px'
    }

  },
  doctorName:{

  },
  rating:{
    '@media (min-width: 730px)': {
      marginTop:'20px'
    }

  }, 
  buttonContainer:{
   margin:'3px auto'

  }

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


const backend_url = process.env.REACT_APP_BACKEND_URL

// function to fetch the list of all the doctors

  async function getDoctorsList() {
    try{
    const response = await getData(
      `${backend_url}/${getAllDoctorsEndPoint}?speciality=${speciality}`
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
                <b>Doctor Name</b> : {doc.firstName} {doc.lastName}
              </Typography>
              <br></br>
              <Typography gutterBottom>
               
            
                <b>Speciality</b> : {doc.speciality}
                <br></br>
                <b>Rating</b> :
                <Rating
                 className={classes.rating}
                  name="half-rating"
                  value={doc.rating}
                  precision={0.5}
                  readOnly
                />
              </Typography>
              <div className="classes.buttonContainer">
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
              </div>
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
