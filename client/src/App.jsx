import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AcountPage";

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
          <Route path="/account/:subpage?" element={<AccountPage />}/>
          {/* ?: make subpage optional so that "/account" can work */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
