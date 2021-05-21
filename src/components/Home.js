import React from "react";
import Employees from "./Employees";
import Tasks from "./Tasks";
export default function Home({
  isManager,
  tasks,
  setTasks,
  employees,
  setEmployees,
  user = { user },
}) {
  if (!isManager) {
    return (
      <div>
        <h1>your tasks</h1>
        <Tasks isManager={isManager} tasks={tasks} setTasks={setTasks} />
      </div>
    );
  } else {
    return (
      <Employees
        employees={employees}
        setEmployees={setEmployees}
        user={user}
      />
    );
  }
}
