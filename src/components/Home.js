import React from "react";
import Employees from "./Employees";
import Tasks from "./Tasks";
export default function Home({
  isManager,
  tasks,
  setTasks,
  employees,
  setEmployees,
}) {
  if (!isManager) {
    return (
      <div>
        <h1>your tasks</h1>
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
    );
  } else {
    return <Employees employees={employees} setEmployees={setEmployees} />;
  }
}
