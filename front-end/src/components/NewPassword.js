import "./newPassword.css";
import "./styles.css";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { abValue } from "../lib";

import { useHistory, Link } from "react-router-dom";

export default function NewPassword() {
  const { onNewPassword, loadingStateSwitch, errMsg, setErrMsg } = useAuth();
  const history = useHistory();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async e => {
    e.preventDefault();
    const email = abValue(emailRef);
    const password = abValue(passwordRef);

    loadingStateSwitch();

    try {
      await onNewPassword(email, password);
      history.push("/login");
      loadingStateSwitch();
    } catch (err) {
      loadingStateSwitch();
      setErrMsg("Some error has occurred.");
      console.log(err);
    }
  };

  return (
    <div className="wrapper" id="new-password">
      <h2>New Password</h2>

      <form onSubmit={handleSubmit}>
        {errMsg && <p className="err-msg">{errMsg}</p>}

        <div>
          <h3 className="instruction">
            Inform your email so you can define a new password.
          </h3>

          <input type="email" placeholder="E-mail" required ref={emailRef} />
        </div>

        <span id="divider"></span>

        <div>
          <h3 className="instruction">Define your password</h3>

          <input
            type="password"
            placeholder="password"
            required
            ref={passwordRef}
          />
        </div>

        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}
