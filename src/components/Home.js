import React from "react";
import Employees from "./Employees";
import Tasks from "./Tasks";
export default function Home({
  isManager,
  tasks,
  setTasks,
  employees,
  setEmployees,
  user,
  setMessageColor,
  setMessage,
}) {
  if (!isManager) {
    // if not manager, show assigned tasks
    return (
      <div>
        <h1>your tasks</h1>
        <Tasks isManager={isManager} tasks={tasks} setTasks={setTasks} />
      </div>
    );
  } else {
    // if manager show all employees and all data
    return (
      <Employees
        employees={employees}
        setEmployees={setEmployees}
        user={user}
        setMessage={setMessage}
        setMessageColor={setMessageColor}
      />
    );
  }
}
