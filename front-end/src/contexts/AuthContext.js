import React, { useContext, useState } from "react";
import API from "../API/index";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const userStateRestarter = () => setUserState(null);
  const userStateUpdater = newState => {
    setUserState(prevState =>
      prevState ? { ...prevState, ...newState } : { ...newState }
    );
  };

  const loadingStateSwitch = () => setLoading(prevState => !prevState);

  const value = {
    userState,
    userStateRestarter,
    loading,
    loadingStateSwitch,
    errMsg,
    setErrMsg,
    onSignup: API.signup(userStateUpdater),
    onLogin: API.login(userStateUpdater),
    onSignout: API.signout(userStateUpdater),
    onUpdateProfile: API.updateProfile(userStateUpdater),
    onNewPassword: API.newPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? "loading..." : children}
    </AuthContext.Provider>
  );
}
