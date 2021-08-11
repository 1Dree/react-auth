import "./login.css";
import "./styles.css";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { abValue } from "../lib";

import { useHistory, Link } from "react-router-dom";

export default function Login() {
  const { onLogin, loadingStateSwitch, errMsg, setErrMsg } = useAuth();
  const history = useHistory();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async e => {
    e.preventDefault();
    const email = abValue(emailRef);
    const password = abValue(passwordRef);

    loadingStateSwitch();

    try {
      await onLogin(email, password);
      history.push("/dashboard");
      loadingStateSwitch();
    } catch (err) {
      setErrMsg("Some error has occurred.");

      console.log(err);
    }
  };

  return (
    <div className="wrapper" id="login">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" required ref={emailRef} />

        <input
          type="password"
          placeholder="password"
          required
          ref={passwordRef}
        />

        <p className="instruction">
          Forgot your password? <Link to="/forgot-password">Click heare.</Link>
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
