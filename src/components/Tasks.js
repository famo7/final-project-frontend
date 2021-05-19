import React from "react";
import Task from "./Task";

export default function Tasks({ tasks, setTasks }) {
  return (
    <div className="row">
      {tasks.map((task) => (
        <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks} />
      ))}
    </div>
  );
}
