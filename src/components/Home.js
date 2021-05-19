import React from "react";
import Tasks from "./Tasks";
export default function Home({ isManager, tasks, setTasks }) {
  if (!isManager) {
    return (
      <div>
        <h1>your tasks</h1>
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
    );
  } else {
    return <h1>manager</h1>;
  }
}
