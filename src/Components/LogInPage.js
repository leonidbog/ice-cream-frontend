import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const LogInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to login user');
            }

            var token = await response.text();
            if(token !== "no authorized"){
                localStorage.setItem("token", token)
                navigator("/")
            }

            console.log('User login -- ' + token);
        } catch (error) {
            console.error('Error login user:', error.message);
        }
    };

    return (
        <div>
            <h1>Login page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="ml-2">Login</Button>
                <Button onClick={() => navigator("/registration")}>Registration</Button>
            </Form>
        </div>
    )
}

export default LogInPage;