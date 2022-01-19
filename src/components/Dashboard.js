import React, {Component, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import NFTLoader from "./NFTLoader";
import Home from "./candymint/Home";
import Minter from "./Minter";
import "@solana/web3.js";

import PhantomConnect from "./PhantomConnect";
import Wallet from './Wallet';

export default function Dashboard() {
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth();
    const {history} = useHistory();
 
    const [nftVisibility, setNftVisibility] = useState(false);
    const [mintingTabVisibility, setMintingTabVisibility] = useState(false);
    const [isPhantom, setIsPhantom] = useState('');

    const buttonStyle = 'btn btn-primary w-100 mt-3 fw-bolder';

    //console.log(phantomConnection);

    async function handleLogout(){
        setError('');
        try {
            await logout();
            history.push('/login');
        } catch (err) {
            setError('Failed to logout');
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <strong>Email: </strong>{currentUser.email}

                    <Link to='/update-profile' 
                    className={buttonStyle} 
                    style={{border:'none', backgroundColor:'#444444'}}
                    >
                        UPDATE PROFILE
                    </Link>

                    {/* <PhantomConnect /> */}
                    <Wallet />
                    {/* <Link to='/candymint' 
                        className={buttonStyle}
                        style={{border:'none', backgroundColor:'#FF5677'}}
                    >
                        START MINTING
                    </Link> */}
                    
                    <Button 
                        className={buttonStyle}
                        style={{border:'none', backgroundColor:'#444444'}}
                        onClick={() => setMintingTabVisibility(!mintingTabVisibility)}
                    >
                        TOGGLE MINTING TAB
                    </Button>
                    {mintingTabVisibility && <Minter/>}
                    <Button 
                        className={buttonStyle}
                        style={{border:'none', backgroundColor:'#444444'}}
                        onClick={() => setNftVisibility(!nftVisibility)}
                    >
                        VIEW NFTS
                    </Button>
                    {console.log('in')}
                    {console.log(window.solana.isPhantom)}
                    {console.log('out')}
                    {nftVisibility && <NFTLoader phantomState={window.solana.isPhantom}/>}

                    {/* <a href='../game/index.html' 
                    className={buttonStyle}
                    style={{border:'none', backgroundColor:'#4e44ce'}}>
                        LOAD GAME
                    </a> */}
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button className='fw-bolder text-white' variant='link' onClick={handleLogout} style={{textDecoration:'none'}}>Log Out</Button>
            </div>
        </>
    )
}
