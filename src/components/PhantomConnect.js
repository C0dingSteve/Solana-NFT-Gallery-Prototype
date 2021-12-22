import { ConnectSolana } from './NFTLoader'
import { Connection } from "@solana/web3.js";
import { Button } from "react-bootstrap"

export default function PhantomConnect() {

    const buttonStyle = 'btn btn-primary w-100 mt-3 fw-bolder';

    async function ConnectSolana() {
        try {
            const resp = await window.solana.connect();
            resp.publicKey.toString();
            // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
            // createConnection();
            getNftTokenData();
            phantomStateHandler('connected');
        } catch (err) {
            // { code: 4001, message: 'User rejected the request.' }
        }
    }

    return (
        <Button 
        className={buttonStyle}
        style={{border:'none', backgroundColor:'#444444'}}
        onClick={ConnectSolana}
    >
        CONNECT WALLET
    </Button>
    )
}