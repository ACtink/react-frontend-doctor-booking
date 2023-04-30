import React from "react";
import { FormControl, FormHelperText, InputLabel } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { postData } from "../../util/fetch";

const useStyles = makeStyles({
  field: {
    marginTop: 40,
    marginBottom: 40,
    textAlign: "center",
  },
  errorColor: {
    color: "red",
  },
});

function Register(props) {
  const { setModalIsOpen } = props;

  const backendurl = process.env.REACT_APP_BACKEND_URL
  console.log(backendurl)

  const classes = useStyles();
  const registerApiEndPoint = "/users/register";

  // calling register api

  const onSubmit = async (data) => {
    const response = await postData(`${backendurl}/${registerApiEndPoint}`, data);
    if (response.status === 200) {
      const user = await response.json();
      console.log(user);
      sessionStorage.setItem("uuid", user.id);
      sessionStorage.setItem("access-token", user.accessToken);
      setModalIsOpen(false);
      alert("Registration Successful!! please Login now!");
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };


  // Registration form

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.field}>
          <FormControl required>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              {...register("firstName", {
                required: true,
              })}
            />
            <FormHelperText id="component-helper-text">
              {errors.firstName && errors.firstName.type === "required" && (
                <span className={classes.errorColor}>
                  Please fill out this field
                </span>
              )}
            </FormHelperText>
          </FormControl>
          {console.log(errors)}

          <br />
          <br />

          <FormControl required>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input {...register("lastName", { required: true })} />
            {errors.lastName && (
              <FormHelperText id="component-helper-text">
                <span className={classes.errorColor}>
                  Please fill out this field
                </span>
              </FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl required>
            <InputLabel htmlFor="emailId">Email Id</InputLabel>
            <Input
              {...register("emailId", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.emailId && (
              <FormHelperText id="component-helper-text">
                <span className={classes.errorColor}>Enter valid Email</span>
              </FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              {...register("password", { required: true })}
              type="password"
            />
            {errors.password && (
              <FormHelperText id="component-helper-text">
                <span className={classes.errorColor}>
                  Please fill out this field
                </span>
              </FormHelperText>
            )}
          </FormControl>

          <br />
          <br />

          <FormControl required>
            <InputLabel htmlFor="mobile">Mobile No</InputLabel>
            <Input
              {...register("mobile", { required: true, pattern: /^\d{10}$/ })}
            />
            {errors.mobile && (
              <FormHelperText id="component-helper-text">
                <span className={classes.errorColor}>
                  Enter valid mobile number
                </span>
              </FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
