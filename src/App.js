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
import MessageAlert from "./components/MessageAlert";
import taskService from "./services/tasks";
import employeeService from "./services/employees";

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
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState("");
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedEmployee");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      messageService.setToken(user.token);
      messageService.getAll().then((msg) => setMessages(msg.messages));
      if (!user.isManager) {
        taskService.setToken(user.token);
        taskService.getAll().then((t) => setTasks(t.tasks));
      } else {
        employeeService.setToken(user.token);
        employeeService.getAll().then((e) => setEmployees(e));
      }
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

      UserUpdate.setToken(user.token);
      messageService.setToken(user.token);
      messageService.getAll().then((msg) => setMessages(msg.messages));
      if (!user.isManager) {
        taskService.setToken(user.token);
        taskService.getAll().then((t) => setTasks(t.tasks));
      } else {
        employeeService.setToken(user.token);
        employeeService.getAll().then((e) => setEmployees(e));
      }

      setUser(user);
      setMessage(`welcome ${user.firstName}`);
      setMessageColor("success");

      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setSocialSecurityNumber("");
      setPassword("");
    } catch (exception) {
      setMessage("User name or password incorrect");
      setMessageColor("danger");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <MessageAlert color={messageColor} message={message} />

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
              <Home
                isManager={user.isManager}
                tasks={tasks}
                setTasks={setTasks}
                employees={employees}
                setEmployees={setEmployees}
                user={user}
                setMessage={setMessage}
                setMessageColor={setMessageColor}
              />
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
                setMessage={setMessage}
                setMessageColor={setMessageColor}
                setMessages={setMessages}
                user={user}
              />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
