import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Logo from "../assets/imgs/logo1.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  checkPasswordValidity,
  handleCheckEmail,
} from "../components/Validation";
import { loginUser } from "../redux/actions/all-actions/AuthAction";

const Login = () => {
  let dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [errPassword, setErrPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  let clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const loginHandler = async () => {
    let userData = {
      email: email,
      password: password,
    };
    if (!checkValidEmail && !checkValidPassword) {
      dispatch(loginUser(userData, clearForm));
    } else {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="form_bg">
        <Link to={"/"}>
          <img src={Logo} alt="" className="logo" />
        </Link>
        <div className="formBlock">
          <h3>Login</h3>
          <div className="formGrid">
            <div className="form_group">
              <MDBInput
                type="email"
                id="form3Example3"
                label="Email address"
                onChange={(e) =>
                  handleCheckEmail(e.target.value, setEmail, setCheckValidEmail)
                }
                value={email}
              />
              {checkValidEmail === true ? (
                <span className="text-muted txt-error">
                  Please enter your valid email
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="form_group">
              <MDBInput
                type={seePassword ? "text" : "password"}
                id="form3Example4"
                label="Password"
                onChange={(e) =>
                  checkPasswordValidity(
                    e.target.value,
                    setPassword,
                    setCheckValidPassword,
                    setErrPassword
                  )
                }
                value={password}
              />
              <span
                className="showHide"
                onClick={() => setSeePassword(!seePassword)}
              >
                {seePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </span>
              {checkValidPassword ? (
                <span className="text-muted txt-error">{errPassword}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <MDBBtn
            color="primary"
            className="submitBtn"
            type="submit"
            onClick={loginHandler}
          >
            Login
          </MDBBtn>
          {/* <div className="my-3 text-center mx-auto">
            <GoogleLogin
              clientId={
                "126844737668-27d8g1qop8164vmev2mlulejmoph6n4q.apps.googleusercontent.com"
              }
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              logo_alignment="center"
              useOneTap={false}
              text="continue_with"
              type="standard"
            >
              Sign in with Google
            </GoogleLogin>
          </div> */}
          <Link to={"/register"} className="accLink">
            Sign up for an account.
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
