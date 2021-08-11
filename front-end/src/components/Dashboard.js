import "./dashboard.css";
import "./styles.css";
import { useAuth } from "../contexts/AuthContext";

import { Link } from "react-router-dom";

export default function Dashboard() {
  const { userState, userStateRestarter } = useAuth();

  return (
    <div className="wrapper" id="dashboard">
      <h2>Dashboard</h2>

      <main>
        <h3>Email: {userState.email}</h3>

        <div id="dashboard-actions">
          <button type="button" id="logoutBtn" onClick={userStateRestarter}>
            Log out
          </button>

          <Link to="/update-profile">
            <button type="button" id="updateBtn">
              Update Profile
            </button>
          </Link>

          <Link to="/signout">
            <button type="button" id="signoutBtn">
              Sign out
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
