import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import classes from "./login.module.scss";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const typeOfPassword = !showPassword ? "password" : "text";

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;

      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof email !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(email)) {
        formIsValid = false;

        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (!password) {
      formIsValid = false;

      errors["password"] = "*Please enter your password.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post("/user/login", { email, password });
        setSuccess(res.data.msg);

        localStorage.setItem("firstLogin", true);

        dispatch(dispatchLogin());
        history.push("/");
      } catch (err) {
        err.response.data.msg && setErr(err.response.data.msg);
      }
    }
  };

  return (
    <React.Fragment>
      <div className={classes.signin}>
        <div className={classes.left}>
          <h1>Web Chat</h1>
          <p>Web Chat helps you to Chat with your friends in Private Room</p>
        </div>
        <div className={classes.info}>
          <form onSubmit={(e) => handleSubmit(e)}>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={classes.errorMsg}>{errors.email}</div>
            </div>
            <div className={classes.password}>
              <input
                type={typeOfPassword}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className={classes.show}
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <VisibilityIcon></VisibilityIcon>
                ) : (
                  <VisibilityOffIcon></VisibilityOffIcon>
                )}
              </div>
              <div className={classes.errorMsg}>{errors.password}</div>
            </div>

            <div>
              <button type="submit"> log in</button>
            </div>
          </form>
          {/* <div className={classes.forgot}>
          <Link className={classes.link}>forgot password?</Link>
        </div> */}
          <div className={classes.line}></div>
          <div className={classes.link}>
            <button>
              <Link to="/register">create new account</Link>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
