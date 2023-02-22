import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Logo from "../assets/imgs/logo1.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Select from "react-select";
import {
  checkPasswordValidity,
  handleCheckEmail,
} from "../components/Validation";
import { registerUser } from "../redux/actions/all-actions/AuthAction";
import { roleOptions } from "../components/SelectOptions";

const Register = () => {
  let dispatch = useDispatch();
  const [name, setName] = useState("");
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [errPassword, setErrPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  let clearForm = () => {
    setName("");
    setRole(null);
    setEmail("");
    setPassword("");
  };

  const handleChange = (e) => {
    let filterValue = e;
    setRole(filterValue);
  };

  const signupHandler = async () => {
    let userData = {
      name: name,
      email: email,
      password: password,
      role: role && role.value,
      profileImage: null,
    };

    if (name !== "" && !checkValidEmail && !checkValidPassword) {
      dispatch(registerUser(userData, clearForm));
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
          <h3>Register</h3>
          <div className="formGrid">
            <div className="form_group">
              <MDBInput
                type="text"
                id="form3Example1"
                label="Full name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="form_group">
              <Select
                value={role}
                onChange={handleChange}
                options={roleOptions}
                placeholder="Select Role"
                autoFocus={false}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "rgb(248 86 6 / 20%)",
                    primary: " #f85606",
                  },
                })}
              />
            </div>
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
            <p>
              By clicking Sign Up, you agree to our{" "}
              <span className="text-theme">Terms and Condition</span> and{" "}
              <span className="text-theme">Privacy Policy</span>
            </p>
          </div>
          <MDBBtn
            color="primary"
            className="submitBtn"
            type="submit"
            onClick={signupHandler}
          >
            Register
          </MDBBtn>
          <Link to={"/login"} className="accLink">
            Already registered, login here.
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
