import { useState, useEffect, useRef } from "react";
import { fetchTodos } from "../../data/todos";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import "./Todo.css";

const initItemsPerPage = 5;
const initOnlyWaiting = false;

function Todo() {
  // todosRaw -> filters -> todos -> display
  const [todosRaw, setTodosRaw] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [todos, setTodos] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(0);

  const itemsPerPageRef = useRef();
  const onlyWaitingRef = useRef();
  const newIdRef = useRef();
  const newTitleRef = useRef();

  useEffect(() => {
    setTodosRaw(fetchTodos());
    setOnlyWaiting(initOnlyWaiting);
    itemsPerPageRef.current.value = initItemsPerPage;
    setItemsPerPage(initItemsPerPage);
    onlyWaitingRef.current.checked = initOnlyWaiting;
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  useEffect(() => {
    if (numPages <= 0) setCurPage(0);
    else if (curPage === 0 || curPage > numPages) setCurPage(1);
  }, [numPages]);
  

  function deleteClick(id) {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
    // setTodosRaw(todoRawSelected);
  }

  function waitClick(id) {
    const todoRawSelected = todosRaw.find((todo) => todo.id === id);
    todoRawSelected.completed = true;
    // setTodosRaw(todosRaw )
    setTodosRaw([...todosRaw]);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Addclick = (id, title) => {
    setTodosRaw([
      ...todosRaw, 
      {
        id: Number(id), // Convert id to a number, if needed
        title,
        userId: 1,
        completed: false,
      }
    ]);
  };
  
  

  return (
    <div className="todo-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <span className="badge bg-primary"> + </span> Add new to do
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                // placeholder=""
                value={
                  Number(todosRaw.reduce((prev, todo) => {
                    return prev < todo.id ? todo.id : prev;
                  }, 0) + 1)
                }
                disabled
                autoFocus
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Todo Title"
                rows={3}
                ref={newTitleRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              const id = newIdRef.current.value;
              const title = newTitleRef.current.value;
              Addclick(id, title);
              handleClose();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* filters */}
      <div className="todo-filters-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            // checked
            onChange={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
            ref={onlyWaitingRef}
          />
          <label className="form-check-label" for="flexSwitchCheckChecked">
            Show only
          </label>
          &nbsp;
          <button className="btn  btn-warning">
            Wating &nbsp;
            <span className="bi bi-clock"></span>
          </button>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={5}
          style={{ width: "200px" }}
          onChange={(e) => {
            setItemsPerPage(e.target.value);
          }}
          ref={itemsPerPageRef}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      {/* table */}
      <table className="table table-striped todo-table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th style={{ textAlign: "right" }}>
              Completed
              <button className="btn btn-primary" onClick={handleShow}>
                <span class="bi bi-plus-circle"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {todos
            .filter((todo, index) => {
              const min = (curPage - 1) * itemsPerPage;
              const max = curPage * itemsPerPage - 1;
              return index >= min && index <= max;
            })
            .map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>
                    <span
                      className="badge bg-secondary"
                      style={{ width: "2rem" }}
                    >
                      {todo.id}
                    </span>
                  </td>
                  <td style={{ textAlign: "left" }}>{todo.title}</td>
                  <td style={{ textAlign: "right" }}>
                    {/* 
                  <span
                    className={
                      'badge ' + (todo.completed ? 'bg-success' : 'bg-warning')
                    }
                  >
                    {todo.completed ? 'done' : 'waiting'}
                    &nbsp;
                    <span
                      className={
                        'bi ' + (todo.completed ? 'bi-check' : 'bi-clock')
                      }
                    ></span>
                  </span>
                  */}
                    {todo.completed ? (
                      <span className="badge bg-success">
                        done&nbsp;
                        <span className="bi bi-check"></span>
                      </span>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          waitClick(todo.id);
                        }}
                      >
                        waiting&nbsp;
                        <span className="bi bi-clock"></span>
                      </button>
                    )}
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteClick(todo.id);
                      }}
                    >
                      <span className="bi bi-trash"></span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* page control */}
      <div>
        <button
          className={
            "todo-space btn " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => {
            setCurPage(1);
          }}
          disabled={curPage <= 1}
        >
          First
        </button>
        <button
          className={
            "todo-space btn " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </button>
        <span className="todo-space">
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        <button
          className={
            "todo-space btn " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </button>
        <button
          className={
            "todo-space btn " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => {
            setCurPage(numPages);
          }}
          disabled={curPage >= numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
