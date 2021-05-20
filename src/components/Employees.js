import React from "react";
import Employee from "./Employee";

export default function Employees({ employees, setEmployees }) {
  return (
    <div className="row">
      {employees.map((employee) => (
        <Employee
          key={employee._id}
          employee={employee}
          setEmployees={setEmployees}
        />
      ))}
    </div>
  );
}
