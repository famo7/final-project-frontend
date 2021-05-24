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
import statsService from "./services/stats";
const App = () => {
  // all state variables
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
  const [stats, setStats] = useState({});
  useEffect(() => {
    // check if employee is logged in using localstorage
    const loggedUserJSON = window.localStorage.getItem("loggedEmployee");
    if (loggedUserJSON) {
      // set user if employee is logged in
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      // set token and get all messages
      messageService.setToken(user.token);
      messageService.getAll().then((msg) => setMessages(msg.messages));
      if (!user.isManager) {
        // if employee is not manager just get the tasks assigned to them
        taskService.setToken(user.token);
        taskService.getAll().then((t) => setTasks(t.tasks));
      } else {
        // if manager get all employees with all data
        employeeService.setToken(user.token);
        employeeService.getAll().then((e) => setEmployees(e));
        // set token and get stats
        statsService.setToken(user.token);
        statsService.getAll().then((e) => setStats(e));
      }
    }
  }, []);

  // function when user logs in
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // use login service from services to login
      const user = await loginService.login({
        // password and social security number
        socialSecurityNumber,
        password,
      });
      // store the user in localstorage
      window.localStorage.setItem("loggedEmployee", JSON.stringify(user));

      // set token when user is logged in and want to update their info
      UserUpdate.setToken(user.token);
      // set token for getting all user messages
      messageService.setToken(user.token);
      // get all messages
      messageService.getAll().then((msg) => setMessages(msg.messages));
      // if user is not manager, get all assigned tasks
      if (!user.isManager) {
        taskService.setToken(user.token);
        taskService.getAll().then((t) => setTasks(t.tasks));
      } else {
        // else get everything for the manager
        employeeService.setToken(user.token);
        employeeService.getAll().then((e) => setEmployees(e));
        statsService.setToken(user.token);
        statsService.getAll().then((e) => setStats(e));
      }

      // set user and display success message after login
      setUser(user);
      setMessage(`welcome ${user.firstName}`);
      setMessageColor("success");

      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setSocialSecurityNumber("");
      setPassword("");
    } catch (exception) {
      // else display error messages
      setMessage("User name or password incorrect");
      setMessageColor("danger");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      {/* message alert at the top */}
      <MessageAlert color={messageColor} message={message} />

      {/* check if there is user, if there is no user, show login form
      else show the navigation */}

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
                stats={stats}
                setStats={setStats}
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
