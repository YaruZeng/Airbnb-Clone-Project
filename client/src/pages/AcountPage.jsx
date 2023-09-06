import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(); // control the redirect after logout
  const {isReady, user, setUser, setReady} = useContext(UserContext); // check the user data loading status
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  };

  if (!isReady) {
    return "Loading...";
  }

  if (isReady && !user && !redirect) { // check if user logined
    return <Navigate to={"/login"}/>; 
  }
  
  function linkClasses (type = null) { // set button red on different tabs at different subpages
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary rounded-full text-white"; 
    }
    return classes;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <nav className="w-full flex mt-8 gap-2 justify-center">
        <Link className={linkClasses("profile")} to={"/account"}>My profile</Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>My bookings</Link>
        <Link className={linkClasses("places")} to={"/account/places"}>My accommodations</Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto mt-8"> 
        {/* mx-auto: center the element on a row  */}
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
    </div>
  );
}