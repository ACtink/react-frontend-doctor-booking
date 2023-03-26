import React from "react";
import Modal from "react-modal";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

Modal.setAppElement("#root");

function DoctorDetails(props) {
  const { showDoctorDetails, setShowDoctorDetails, selectedDoctor } = props;

// creating a card layout to display the doctor details
  return (
    <div>
      <Modal
        className="mymodal"
        overlayClassName="myoverlay"
        isOpen={showDoctorDetails}
        onRequestClose={() => {
          setShowDoctorDetails(false);
        }}
      >
        <Card>
          <CardHeader
            title="Doctor Details"
            style={{
              backgroundColor: "purple",
              color: "white",
              height: 70,
              padding: 11,
            }}
          ></CardHeader>

          <CardContent>
            <Typography variant="h5">
              Dr : {`${selectedDoctor.firstName} ${selectedDoctor.lastName} `}
              <Typography display="block">
                Total Experience : {`${selectedDoctor.totalYearsOfExp} years `}
              </Typography>
              <Typography>Speciality : {selectedDoctor.speciality}</Typography>
              <Typography>Date of Birth : {selectedDoctor.dob}</Typography>
              {selectedDoctor.address && (
                <Typography> City : {selectedDoctor.address.city}</Typography>
              )}
              <Typography>Email : {selectedDoctor.emailId}</Typography>
              <Typography>Mobile : {selectedDoctor.mobile}</Typography>
              <Typography>
                Rating :{" "}
                <Rating
                  name="half-rating"
                  value={selectedDoctor.rating}
                  precision={0.5}
                  readOnly
                />
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}

export default DoctorDetails;
