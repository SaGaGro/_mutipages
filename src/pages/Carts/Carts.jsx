import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Carts.css";

function Carts({ carts, setCarts }) {
  return (
    <div className="carts-container">
      <div className="carts-items-container">
      {carts.map((cart) => (
        <div key={cart.id}>
          <Card style={{ width: "13rem" }}>
            <Card.Img variant="top" src={cart.thumbnailUrl} />
            <Card.Body>
              <Card.Title>{cart.title}</Card.Title>
              <Card.Text>{cart.price}</Card.Text>

              <Button
                variant="outline-danger"
                onClick={() => {setCarts(carts.filter((c) => c.id !== cart.id))
                
                }}
              >
                Remove from Carts
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
    <h4>Products: <span className="badge bg-dark">{carts.length}</span> Total: <span className="badge bg-dark">{carts.reduce((a, b) => a + b.price, 0).toFixed(2)}</span></h4>
    <button className="btn btn-warning">Checkout</button>
    </div>
  );
}

export default Carts;
