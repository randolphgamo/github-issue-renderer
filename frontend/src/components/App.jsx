import React, { useEffect, useState } from "react";
import Home from "./Home";
import Signin from "./Signin";
import LoginSuccess from "./LoginSuccess";
import UserContext from "./UserContext";

import { Routes, Route, Navigate } from "react-router-dom";
import IssueDetails from "./IssueDetails";

function App() {
  const [token, setToken] = useState(null);

  const [userProfilePic, setUserProfilePic] = useState('');


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  });

  return (

    <>
        <UserContext.Provider value={{ userProfilePic, setUserProfilePic }}>

      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route
          path="/issues"
          element={token ? <Home /> : <Navigate to="/" replace />}
        />
        {/* <Route path="/issues" element={<Home />} /> */}

        <Route exact path="/error">
          There was an error while logging in. Please try again
        </Route>
        <Route
          path="/:owner/:organisation/issues/:issueNumber"
          element={<IssueDetails />}
        />
        <Route exact path="/login/success" element={<LoginSuccess />} />
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
