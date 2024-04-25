import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import { toast } from 'react-toastify'
import App from "../App";

const AllIceCreamsPage = () => {

    const [items, setItems] = useState([]);
    const [token, setToken] = useState('')
    const navigator = useNavigate()


    useEffect(() => {

        setToken(localStorage.getItem("token"))

        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:8080/allIcecreams');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchItems();
    }, []);

    const addToCard = async (item) => {
        if (token === null) {
            navigator("/login")
        }

        try {
            const formData = new URLSearchParams()
            formData.append('itemId', item.id)
            formData.append('token', token)


            const response = await fetch('http://localhost:8080/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            })


            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.text()
            if (data !== "Invalid token") {
                toast.success("item added!")
            }
        } catch (error) {
            console.error('There was an error!', error)
        }
    }

    const logOutButton = () => {
        return (
            <Button variant="outline-danger" onClick={logOut}>lot out</Button>
        )
    }
    const navToCart = () => {
        return (
            <Button variant="success" onClick={() => navigator("/cart")}>cart</Button>
        )
    }

    const logOut = () => {
        localStorage.removeItem("token")
        navigator("/login")
    }
    const profileGroup = () => {
        if (token !== null) {
            return (
                <div align="right">
                    {navToCart()}
                    {logOutButton()}
                </div>
            )
        }
    }

    return (
        <div className="App" align="center">
            <h1>ALL ICECREAMS</h1>
            {profileGroup()}
            <ListGroup>
                {
                    items.map((item, index) => (
                        <ListGroupItem className="ItemCard" key={index}>
                            <h3>{item.name}</h3>
                            <p>{item.brand}</p>
                            <p>{item.type}</p>
                            <p>{item.price}</p>
                            <Button variant="warning" onClick={() => addToCard(item)}>add to card</Button>
                        </ListGroupItem>
                    ))
                }
            </ListGroup>
        </div>
    )
}

export default AllIceCreamsPage;