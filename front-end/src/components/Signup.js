import "./signup.css";
import "./styles.css";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { abValue } from "../lib";

import { useHistory, Link } from "react-router-dom";

export default function Signup() {
  const { onSignup, loadingStateSwitch } = useAuth();
  const history = useHistory();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rePasswordRef = useRef("");

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const email = abValue(emailRef);
    const password = abValue(passwordRef);
    const rePassword = abValue(rePasswordRef);

    if (password !== rePassword) {
      setErrMsg("passwords don't match");
      return;
    }

    loadingStateSwitch();

    try {
      await onSignup(email, password);
      history.push("/dashboard");
      loadingStateSwitch();
    } catch (err) {
      setErrMsg("Some error has occurred.");

      console.log(err);
    }
  };

  return (
    <div className="wrapper" id="signup">
      <h2>Sign up</h2>

      <form onSubmit={handleSubmit}>
        {errMsg && <p className="err-msg">{errMsg}</p>}

        <input type="email" placeholder="E-mail" required ref={emailRef} />

        <input
          type="password"
          placeholder="password"
          required
          ref={passwordRef}
        />

        <input
          className="last-input"
          type="password"
          placeholder="retype your password"
          required
          ref={rePasswordRef}
        />

        <p className="instruction">
          Already have an account? <Link to="/login">Click heare</Link>
        </p>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
