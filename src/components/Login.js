import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import '../styles/global.css'

export default function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const buttonStyle = 'btn btn-primary w-100 mt-3 fw-bolder';

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch(err){
            console.log(err.message);
            setError('Failed to sign in');
        }
        setLoading(false);
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>
                    Login
                </h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <br />
                    <Button disabled={loading} 
                    className={buttonStyle} 
                    type='submit'
                    style={{border:'none', backgroundColor:'#444444'}}
                    >Login</Button>
                </Form>
                <div className="w-100 text-center mt-3 text-white">
                    <Link to='/forgot-password' className='text-white fw-bolder'>Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
            <div className='w-100 text-center mt-2 text-white' style={{textDecoration:'none'}}>
                Need an account? <Link to='/signup' className='text-white fw-bolder'>Sign Up</Link>
            </div>
        </>
    )
}
