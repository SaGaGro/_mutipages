import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ tab, setTab, products, carts, setToken }) {
  const handleLogout = () => {
    const confirmLogout = window.confirm("ยืนยันที่จะออกจากระบบใช่มั้ย?");
    if (confirmLogout) {
      setToken("");
    }
  };

  return (
    <div className="navbar-container">
      <Link to={"/home"}>
        <button
          className={
            "btn " + (tab === "home" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("home")}
        >
          Home
        </button>
      </Link>
      <Link to={"/calculator"}>
        <button
          className={
            "btn " +
            (tab === "calculator" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("calculator")}
        >
          Calculator
        </button>
      </Link>
      <Link to={"/animation"}>
        <button
          className={
            "btn " +
            (tab === "animation" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("animation")}
        >
          Animation
        </button>
      </Link>
      <Link to={"/component"}>
        <button
          className={
            "btn " +
            (tab === "component" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("component")}
        >
          Component
        </button>
      </Link>
      <Link to={"/products"}>
        <button
          className={
            "btn " +
            (tab === "products" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("products")}
        >
          Products ({products.length})
        </button>
      </Link>
      <Link to={"/carts"}>
        <button
          className={
            "btn " + (tab === "carts" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("carts")}
        >
          Carts{" "}
          <p className="top">
            {carts.length > 0 && (carts.length > 9 ? "9+" : carts.length)}
          </p>
        </button>
      </Link>
      <Link to={"/todo"}>
        <button
          className={
            "btn " + (tab === "todo" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("todo")}
        >
          Todo
        </button>
      </Link>

      <button
        className={"btn btn-outline-danger"}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
