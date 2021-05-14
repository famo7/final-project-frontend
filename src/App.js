import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import TopNav from "./components/TopNav";
import loginService from "./services/login";
import UserUpdate from "./services/UserUpdate";
import messageService from "./services/messages";

const App = () => {
  const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [newPass, setNewPass] = useState("");
  const [messages, setMessages] = useState([]);
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedEmployee");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      messageService.setToken(user.token);
      messageService.getAll().then((msg) => setMessages(msg.messages));
    }
  }, [messages]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        socialSecurityNumber,
        password,
      });
      window.localStorage.setItem("loggedEmployee", JSON.stringify(user));
      UserUpdate.setToken(user.token);
      messageService.setToken(user.token);
      messageService.getAll().then((msg) => setMessages(msg.messages));
      setUser(user);

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
              <Profile
                newAddress={newAddress}
                setNewAddress={setNewAddress}
                newPass={newPass}
                setNewPass={setNewPass}
                userId={user.id}
              />
            </Route>
            <Route exact path="/messages">
              <Messages
                messages={messages}
                to={to}
                title={title}
                body={body}
                setTo={setTo}
                setTitle={setTitle}
                setBody={setBody}
              />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
