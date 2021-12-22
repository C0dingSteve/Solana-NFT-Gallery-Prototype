import React from 'react'

export default function Minter() {
    
    return (
        <div className="list-group" style={{paddingTop:'15px'}}>
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" style={{backgroundColor:'#B958A5'}}>
                <div className="d-flex w-100 justify-content-between" style={{backgroundColor:'#B958A5'}}>
                    <h5 className="mb-1" style={{backgroundColor:'#B958A5'}}>CandyMachine ID</h5>
                </div>
                <p className="mb-1" style={{backgroundColor:'#B958A5'}}>{process.env.REACT_APP_CANDY_MACHINE_ID}</p>
            </a>
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" style={{backgroundColor:'#B958A5'}}>
                <div className="d-flex w-100 justify-content-between" style={{backgroundColor:'#B958A5'}}>
                    <h5 className="mb-1" style={{backgroundColor:'#B958A5'}}>Candy Machine Configuration</h5>
                </div>
                <p className="mb-1" style={{backgroundColor:'#B958A5'}}>{process.env.REACT_APP_CANDY_MACHINE_CONFIG}</p>
            </a>
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" style={{backgroundColor:'#B958A5'}}>
                <div className="d-flex w-100 justify-content-between" style={{backgroundColor:'#B958A5'}}>
                    <h5 className="mb-1" style={{backgroundColor:'#B958A5'}}>RPC Host</h5>
                </div>
                <p className="mb-1" style={{backgroundColor:'#B958A5'}}>{process.env.REACT_APP_SOLANA_RPC_HOST}</p>
            </a>
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" style={{backgroundColor:'#B958A5'}}>
                <div className="d-flex w-100 justify-content-between" style={{backgroundColor:'#B958A5'}}>
                    <h5 className="mb-1" style={{backgroundColor:'#B958A5'}}>Treasury Address</h5>
                </div>
                <p className="mb-1" style={{backgroundColor:'#B958A5'}}>{process.env.REACT_APP_TREASURY_ADDRESS}</p>
            </a>
        </div>
    )
}
