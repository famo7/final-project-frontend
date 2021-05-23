import React from "react";
import { Button, Card } from "react-bootstrap";
import taskService from "../services/tasks";
import timeService from "../services/time";

export default function Task({ task, tasks, setTasks }) {
  const startTime = () => {
    // update status using task service
    taskService.updateStatus(task._id, { status: "In progress" });
    // date now
    let now = new Date().toString();

    taskService.updateTime(task._id, { startTime: now, endTime: task.endTime });

    // update state after start time changes
    setTasks(
      [...tasks].map((object) => {
        if (object._id === task._id) {
          return {
            ...object,
            startTime: now,
            endTime: task.endTime,
          };
        } else return object;
      })
    );
  };
  const endTime = () => {
    if (task.startTime !== null) {
      taskService.updateStatus(task._id, { status: "Finished" });

      let now = new Date().toString();
      taskService.updateTime(task._id, {
        startTime: task.startTime,
        endTime: now,
      });

      // update state after endTime updates
      setTasks(
        [...tasks].map((object) => {
          if (object._id === task._id) {
            return {
              ...object,
              startTime: task.startTime,
              endTime: now,
            };
          } else return object;
        })
      );
    }
  };

  return (
    // render cart for every task
    <Card className="col-xs-3">
      <Card.Header>Task from : {task.createdBy}</Card.Header>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Subtitle className="mb-2">
          DeadLine: {timeService.formatTime(task.deadLine)}
        </Card.Subtitle>
        <Card.Text>{task.description}</Card.Text>
        <Button onClick={startTime} disabled={task.startTime} className="mr-4">
          Start Task
        </Button>
        <Button onClick={endTime} variant="danger" disabled={task.endTime}>
          End Task
        </Button>
      </Card.Body>
    </Card>
  );
}
