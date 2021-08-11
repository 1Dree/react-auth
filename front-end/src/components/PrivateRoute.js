import { useAuth } from "../contexts/AuthContext";

import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { userState } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        userState ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
