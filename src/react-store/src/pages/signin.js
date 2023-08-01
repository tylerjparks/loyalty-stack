import React from "react";
import Button from "react-bootstrap/Button";
import Login from "../components/login";
import SignInOutContainer from "../containers/singInLoginIndex";
import "../../src/css/main.css";

// Sign-in, out, account creation page

const SignIn = ({user, setUser}) => {
  return (
    <div className="signin">
      {/* <Button href="/" style={{ margin: 4, padding: 4 }} variant="primary">
        Login
      </Button>{" "} */}
      <SignInOutContainer user={user} setUser={setUser} />
      {/* <Button href="/" style={{ margin: 4, padding: 4 }} variant="primary">
        Create Account
      </Button>{" "} */}
    </div>
  );
};

export default SignIn;
