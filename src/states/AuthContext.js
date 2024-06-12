// AuthContext.js
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  let UserProfileData = {};

  
  if (localStorage && localStorage.getItem("profileData")) {
    UserProfileData = localStorage.getItem("profileData") && JSON.parse(localStorage.getItem("profileData"));
  }

  const [profileData, setProfileData] = useState(UserProfileData);

  // useEffect(()=>{
  //   setProfileData(UserProfileData)
  // },[]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, profileData, setProfileData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
