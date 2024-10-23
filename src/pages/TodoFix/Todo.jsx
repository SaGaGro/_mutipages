import React, { useEffect } from "react";
import "./Todo.css";
import { useState } from "react";
import { fetchTodos } from "../../data/todos";

function Todo() {
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    setTodosRaw(fetchTodos());
    console.log(todosRaw);
  }, []);

  useEffect(() => {
    setTodos(todosRaw);
  }, [todosRaw]);


  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);


  useEffect(() => {
    setNumPages(Math.ceil(todosRaw.length / itemPerPage));
    setTodos(todosRaw.slice(0, itemPerPage));
  }, [todosRaw, itemPerPage]);

  return (
    <div className="todo-container">
      <div className="header-select">
        <div className="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onChange={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
          />
          <label className="form-check-label" for="flexSwitchCheckChecked">
            Show only
          </label>
          &nbsp;
          <span className="badge bg-warning">Wating</span>
          <span className="bi bi-clock"></span>
        </div>
        <div>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "10rem" }}
            onChange={(e) => setItemPerPage(e.target.value)}
          >
            <option selected value={5}>
              5 items per page
            </option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </select>
        </div>
      </div>

      {/* todo list */}
      <table className="table table-striped">
        <thead className="table table-dark">
          <tr>
            <th align="left">ID</th>
            <th>Title</th>
            <th align="right">Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <span className="badge bg-primary" style={{ width: "2rem" }}>{todo.id}</span>
              </td>
              <td>{todo.title}</td>
              <td style={{ textAlign: "right" }}>
                <span
                  className={
                    "badge" + (todo.completed ? " bg-success" : " bg-warning")
                  }
                >
                  {todo.completed ? "Done" : "Waiting"}
                  &nbsp;
                  <span
                    className={
                      "bi" + (todo.completed ? " bi-check-lg" : "bi bi-clock")
                    }
                  ></span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>

      {/* page controls */}
      <div className="page-controls">
        <button className="btn btn-outline-primary">First</button>
        <button className="btn btn-outline-primary">Previous</button>
        <p>1/5</p>
        <button className="btn btn-outline-primary">Next</button>
        <button className="btn btn-outline-primary">Last</button>
      </div>
    </div>
  );
}

export default Todo;
