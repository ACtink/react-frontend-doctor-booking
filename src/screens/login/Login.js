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

function Login(props) {
  const { isLoggedIn, isOpen, setIsLoggedIn, setModalIsOpen } = props;

  const classes = useStyles();

  const loginApiEndPoint = "/auth/login";
  const backendurl = process.env.REACT_APP_BACKEND_URL;

  //  function to call loginApi

  const onSubmit = async (data) => {
    const response = await postData(
      `${backendurl}/${loginApiEndPoint}`,
      {},
      {
        Authorization:
          "Basic " + window.btoa(data.emailId + ":" + data.password),
      }
    );

    if (response.status === 200) {
      setIsLoggedIn(true);
      const user = await response.json();
      console.log(user);
      sessionStorage.setItem("uuid", user.id);
      sessionStorage.setItem("access-token", user.accessToken);
      setModalIsOpen(false);
    } else {
      const error = await response.json();
      console.log(error);
      alert(error.message);
    }
  };

  // Login form

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
            <InputLabel htmlFor="emailId">Email</InputLabel>
            <Input
              {...register("emailId", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />

            <FormHelperText id="component-helper-text">
              {errors.emailId && errors.emailId.type === "pattern" && (
                <span className={classes.errorColor}>Enter valid Email</span>
              )}
            </FormHelperText>
          </FormControl>
          {console.log(errors)}
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
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
export default Login;
