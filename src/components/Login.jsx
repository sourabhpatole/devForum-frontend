import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isloginform, setIsloginform] = useState(true);
  const [error, setError] = useState("");
  //   console.log(emailId, Password);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!");
    }
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!");
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isloginform ? "Login" : "Sign Up"}
            </h2>
            {!isloginform && (
              <>
                <div className="">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={firstName}
                      placeholder=""
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                </div>
                <div className="">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={lastName}
                      placeholder=""
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </div>
              </>
            )}
            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email Id</legend>
                <input
                  type="text"
                  className="input"
                  value={emailId}
                  placeholder=""
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="password"
                  className="input"
                  value={password}
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-2">
              <button
                className="btn btn-primary"
                onClick={isloginform ? handleLogin : handleSignup}
              >
                {isloginform ? "Login" : "Sign Up"}
              </button>
            </div>
            <p
              className="text-center cursor-pointer py-2"
              onClick={() => setIsloginform((prev) => !prev)}
            >
              {isloginform
                ? "New User? Sign Up here"
                : "Existing User Login here"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
