import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import TopNav from "./components/TopNav";
import loginService from "./services/login";

const App = () => {
  const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedEmployee");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        socialSecurityNumber,
        password,
      });
      window.localStorage.setItem("loggedEmployee", JSON.stringify(user));
      setUser(user);
      console.log(user);
      setSocialSecurityNumber("");
      setPassword("");
    } catch (exception) {
      console.log("User name or password incorrect");
    }
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          socialSecurityNumber={socialSecurityNumber}
          setSocialSecurityNumber={setSocialSecurityNumber}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <Router>
          <TopNav setUser={setUser} />
          <Switch>
            <Route exact path="/">
              <Home isManager={user.isManager} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;