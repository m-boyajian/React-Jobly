import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import JoblyApi from "./JoblyApi";
import Routes from "./routes/Routes";
import useLocalStorage from "./useLocalStorage";
import jwt from "jsonwebtoken";
import UserContext from "./UserContext";

function App() {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [infoLoaded, setInfoLoaded] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  useEffect(function loadUserInfo() {
    async function getUser() {
      if (token) {
        try{
        // Decode the token to extract the username
        let { username } = jwt.decode(token);
        JoblyApi.token = token;
        // Fetch user details using the extracted username
        let currentUser = await JoblyApi.getUser(username);
        // Update currentUser state with the fetched user data
        setCurrentUser(currentUser);
        setApplicationIds(new Set(currentUser.applications));
      } catch (error) {
          console.error("Loading error:", error);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getUser();
  }, [token]);  

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      console.log("Token received after signup:", token);
      // Set the token in local storage using setToken
      setToken(token);
      return { success: true };
    } catch (error) {
      console.error("signup failed", error);
      return { success: false, error };
    }
  }   
  
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      console.log("Token received after login:", token);
      // Set the token in local storage using setToken
      setToken(token);
      return { success: true };
    } catch (error) {
      console.error("login failed", error);
      return { success: false, error };
    }
  }    

  function logout() {
    // Clear the current user details
    setCurrentUser(null);
    setToken('');
  }  

  function applyToJob(id) {
    if (hasApplied(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  async function hasApplied(id) {
    return applicationIds.has(id);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasApplied, applyToJob }} >
        <div className="App">
          <NavBar logout={logout} />
          <Routes signup={signup} login={login} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

