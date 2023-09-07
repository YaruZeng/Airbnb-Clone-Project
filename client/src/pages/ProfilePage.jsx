import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate} from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function ProfilePage({}) {
  const [redirect, setRedirect] = useState(); // control the redirect after logout
  const { isReady, user, setUser, setReady } = useContext(UserContext); // check the user data loading status

  if (!isReady) {
    return "Loading...";
  }

  if (isReady && !user && !redirect) {
    // check if user logined
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
        <div className="text-center max-w-lg mx-auto mt-8">
          {/* mx-auto: center the element on a row  */}
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
    </div>
  );
}
