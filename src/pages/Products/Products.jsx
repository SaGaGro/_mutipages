import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Products.css";

function Products({ products, carts, setCarts }) {
  return (
    <div className="products-container">
      <div className="products-items-container">
      {products.map((product) => (
        <Card style={{ width: "13rem" }}>
          <Card.Img variant="top" src={product.thumbnailUrl} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.price}</Card.Text>
            {carts.find((cart) => cart.id === product.id) ? <span className="badge bg-success">Product Added</span>: (<Button
              variant="outline-primary"
              onClick={() => {
                setCarts([...carts, product]);
              }}
            >
              Add to Carts
            </Button>)}
          
          </Card.Body>
        </Card>
      ))}
    </div>
    <button className="btn btn-success select" onClick={() => setCarts(products)}>Select All</button>
    </div>
  );
}

export default Products;
