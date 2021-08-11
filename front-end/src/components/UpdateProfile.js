import "./updateProfile.css";
import "./styles.css";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { abValue } from "../lib";

import { useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const { userState, onUpdateProfile, loadingStateSwitch, errMsg, setErrMsg } =
    useAuth();
  const history = useHistory();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rePasswordRef = useRef("");

  const handleSubmit = async e => {
    e.preventDefault();
    const email = abValue(emailRef);
    const password = abValue(passwordRef);
    const rePassword = abValue(rePasswordRef);

    if (password !== rePassword) {
      setErrMsg("passwords don't match");
      return;
    }

    const fieldsMap = {
      email,
      password,
    };

    const data = Object.entries(fieldsMap).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;

      return acc;
    }, {});

    loadingStateSwitch();

    try {
      await onUpdateProfile(userState._id, data);
      history.push("/dashboard");
      loadingStateSwitch();
    } catch (err) {
      setErrMsg("Some error has occurred.");

      console.log(err);
    }
  };

  return (
    <div className="wrapper" id="update-profile">
      <h2>Update Profile</h2>

      <form onSubmit={handleSubmit}>
        {errMsg && <p className="err-msg">{errMsg}</p>}

        <p className="instruction">
          If you don't want to update one of these fields, just leave it blank.
        </p>

        <input type="email" placeholder="E-mail" ref={emailRef} />

        <input type="password" placeholder="password" ref={passwordRef} />

        <input
          className="last-input"
          type="password"
          placeholder="retype your password"
          ref={rePasswordRef}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
