import "./signout.css";
import "./styles.css";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { abValue } from "../lib";

import { useHistory } from "react-router-dom";

export default function Signout() {
  const { onSignout, loadingStateSwitch, errMsg, setErrMsg } = useAuth();
  const history = useHistory();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async e => {
    e.preventDefault();
    const email = abValue(emailRef);
    const password = abValue(passwordRef);

    loadingStateSwitch();

    try {
      await onSignout(email, password);
      loadingStateSwitch();
      history.push("/");
    } catch (err) {
      setErrMsg("Some error has occurred.");
      console.log(err);
    }
  };

  return (
    <div className="wrapper" id="signout">
      <h2>Sign out</h2>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" required ref={emailRef} />

        <input
          type="password"
          placeholder="password"
          required
          ref={passwordRef}
        />

        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
