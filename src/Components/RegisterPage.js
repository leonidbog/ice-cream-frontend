import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
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
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to reg user');
            }

            const token = await response.text();
            if(token === "Registration complete!"){
                navigator("/login")
            }else{
                alert('this email already taken')
            }

            console.log('User reg -- ' + token);
        } catch (error) {
            console.error('Error reg user:', error.message);
        }
    };

    return (
        <div>
            <h1>Registration page</h1>
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
                <Button variant="primary" type="submit" className="ml-2">Registration</Button>
                <Button onClick={() => navigator("/login")}>Login</Button>
            </Form>
        </div>
    )
}

export default RegisterPage;