import { useState } from "react";
import { Link } from "react-router-dom";
// import DatePicker from "react-date-picker";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Form, FormGroup, Col, Form as Input } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import classes from "./signup.module.scss";
const Signup = (props) => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const typeOfPassword = !showPassword ? "password" : "text";
  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeMobile = (e) => {
    setMobile(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!firstName) {
      formIsValid = false;

      errors["firstName"] = "*Please enter your first name.";
    }

    if (typeof firstName !== "undefined") {
      if (!firstName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!lastName) {
      formIsValid = false;

      errors["lastName"] = "*Please enter your last name.";
    }

    if (typeof lastName !== "undefined") {
      if (!lastName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["lastName"] = "*Please enter alphabet characters only.";
      }
    }

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

    if (!mobile) {
      formIsValid = false;

      errors["mobile"] = "*Please enter your mobile no.";
    }

    if (typeof mobile !== "undefined") {
      if (!mobile.match(/^[0-9]{10}$/)) {
        formIsValid = false;

        errors["mobile"] = "*Please enter valid mobile no. of length 10";
      }
    }

    if (!password) {
      formIsValid = false;

      errors["password"] = "*Please enter your password.";
    }

    if (typeof password !== "undefined") {
      if (
        !password.match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&^*()]).*$/
        )
      ) {
        formIsValid = false;

        errors["password"] =
          "*Please enter secure and strong password. Password should contain min length 8,  small, capital letters, numbers and special letters";
      }
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const name = `${firstName} ${lastName} `;

      fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res.msg);
          if (res.msg != "This email already exists.") {
            setSuccess(res.msg);
            setFirstName("");
            setLastName("");
            setMobile("");
            setEmail("");
            setPassword("");
            console.log(res);
            setTimeout(function () {
              history.push("/");
            }, 5000);
          } else {
            setErr(res.msg);
          }
        })
        .catch((err) => {
          setErrors(err.res.data.msg);
        });
    }
  };

  return (
    <div className={classes.signup}>
      <div className={classes.bg}></div>
      <div className={`${classes.container} container`}>
        <h2 className={`${classes.text}`}>Signup Form</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <Form
          method="post"
          name="userRegistrationForm"
          onSubmit={(e) => handleSubmit(e)}
        >
          <FormGroup>
            <Input.Row>
              <Col>
                <Input.Control
                  type="text"
                  size="lg"
                  name="name"
                  id="firstname"
                  value={firstName}
                  onChange={handleChangeFirstName}
                  placeholder="First Name"
                />
                <div className={classes.errorMsg}>{errors.firstName}</div>
              </Col>
              <Col>
                <Input.Control
                  type="text"
                  size="lg"
                  name="lastname"
                  id="name"
                  value={lastName}
                  onChange={handleChangeLastName}
                  placeholder="Last Name"
                />
                <div className={classes.errorMsg}>{errors.lastName}</div>
              </Col>
            </Input.Row>
          </FormGroup>

          <FormGroup>
            <Input.Control
              type="text"
              size="lg"
              name="mobile"
              id="exampleMobile"
              value={mobile}
              onChange={handleChangeMobile}
              placeholder="Enter a Mobile No."
            />

            <div className={classes.errorMsg}>{errors.mobile}</div>
          </FormGroup>

          <FormGroup>
            <Input.Control
              type="email"
              size="lg"
              name="email"
              id="exampleEmail"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Enter a email"
            />

            <div className={classes.errorMsg}>{errors.email}</div>
          </FormGroup>

          <div className={classes.password}>
            <FormGroup>
              <Input.Control
                type={typeOfPassword}
                size="lg"
                name="password"
                id="examplePassword"
                value={password}
                onChange={handleChangePassword}
                placeholder="Enter a password"
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
            </FormGroup>
          </div>

          <div className="d-flex justify-content-center mt-3 login_container">
            <div className={classes.linkbutton}>
              <button>
                <Link to="/" className={classes.link}>
                  Cancel
                </Link>
              </button>
              <button type="submit">Submit</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
