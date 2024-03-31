import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import UserContext from "./UserContext";
import "./Home.css";

function Home() {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();

  function handleLogin() {
    history.push("/login");
  }

  function handleSignup() {
    history.push("/signup");
  }

  return (
    <div>
      <div className="home-background" />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-text-title">Jobly</h1>
          <h4 className="home-text">All the jobs in one, convenient place.</h4>
          {currentUser ? (
            <p className="welcome-text">Welcome back, {currentUser.username}!</p>
          ) : (
            <div>
              <Button onClick={handleLogin} color="primary" className="button">
                Log In
              </Button>
              <Button onClick={handleSignup} color="primary" className="button">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

