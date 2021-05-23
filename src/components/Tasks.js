import React from "react";
import Task from "./Task";

export default function Tasks({ tasks, setTasks, isManager }) {
  return (
    // loop over all tasks and render them using a Task component
    <div className="row">
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          tasks={tasks}
          setTasks={setTasks}
          isManager={isManager}
        />
      ))}
    </div>
  );
}
