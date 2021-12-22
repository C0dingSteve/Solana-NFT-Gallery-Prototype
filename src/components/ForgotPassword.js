import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function ForgotPassword(){

    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const buttonStyle = 'btn btn-primary w-100 mt-3 fw-bolder';

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setMessage('')
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions');
        } catch(err){
            console.log(err.message);
            setError('Failed to reset password');
        }
        setLoading(false);
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>
                    Password Reset
                </h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <br />
                    <Button disabled={loading} 
                    className={buttonStyle} 
                    type='submit'
                    style={{border:'none', backgroundColor:'#444444'}}
                    >Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to='/login'>Login</Link>
                </div>
            </Card.Body>
        </Card>
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    )
}
