import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MembersPage from "./pages/MembersPage";
import RidesPage from "./pages/RidesPage";
import NavBar from "./pages/NavBar";

const App = ({ signOut }) => {
  return (
    <div>
      <Router>
        <NavBar signout={signOut} />
        <Routes>
          <Route exact path="/" element={<MembersPage />} />
          <Route exact path="/rides" element={<RidesPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default withAuthenticator(App);
