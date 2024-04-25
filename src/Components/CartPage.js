import React, {useEffect, useState} from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

const CartPage = () => {

  const [items, setItems] = useState([]);
  const [token, setToken] = useState('')

  useEffect(() => {

    setToken(localStorage.getItem("token"))

    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cart?token=${token}`);
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [token]);

  return (
      <div>
        <h1>CART</h1>
        <ListGroup>
          {
            items.map((item, index) => (
                <ListGroupItem className="ItemCard" key={index}>
                  <h3>{item.name}</h3>
                  <p>{item.brand}</p>
                  <p>{item.type}</p>
                  <p>{item.price}</p>
                </ListGroupItem>
            ))
          }
        </ListGroup>
      </div>

  )
}

export default CartPage