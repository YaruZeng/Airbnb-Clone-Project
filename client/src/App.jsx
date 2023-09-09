import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import PlacesPage from "./pages/PlacesPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import BookingsPage from "./pages/BookingsPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import BookingDetailPage from "./pages/BookingDetailPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true; // cookie setting

function App() {


  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />}/>
          <Route path="/account/user-places" element={<PlacesPage />}/>
          <Route path="/account/places/new" element={<PlacesFormPage />}/>
          <Route path="/account/places/:id" element={<PlacesFormPage />}/>
          <Route path="/place/:id" element={<PlaceDetailPage />}/>
          <Route path="/account/bookings" element={<BookingsPage />}/>
          <Route path="/account/bookings/:id" element={<BookingDetailPage />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
