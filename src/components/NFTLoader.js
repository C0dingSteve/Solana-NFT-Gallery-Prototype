import { useEffect, useState } from "react"
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig} from "@nfteyez/sol-rayz";
import axios from "axios";

import ModelLoader from "./ModelLoader";


export default function NFTLoader({phantomState}) {
    const [error, setError] = useState('');

    const [nftData, setNftData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function data() {
            let res = await getNftTokenData();
            setNftData(res);
            setLoading(true);
        }
        data();
        }, []);

    //check solana on window. Useful to fetch public address of your wallet
    const getProvider = () => {
        setError('')
        if ("solana" in window) {
          const provider = window.solana;
          if (provider.isPhantom) {
              phantomState = provider.isPhantom;
            return provider;
          }else{
              setError('Wallet Disconnected')
          }
        }
        window.open("https://phantom.app/", "_blank");
    };

    //Fetch and store all NFT data here
    const getAllNftData = async () => {
        try {
            //if (connectData === true) {
                const connect = createConnectionConfig(clusterApiUrl("devnet"));
                const provider = getProvider();
                let ownerToken = provider.publicKey;
                console.log(ownerToken);
                const result = isValidSolanaAddress(ownerToken);
                console.log("result", result);
                const nfts = await getParsedNftAccountsByOwner({
                    publicAddress: ownerToken,
                    connection: connect,
                    serialization: true,
                });
                console.log(nfts);
                return nfts;
            //}
        } catch (error) {
            console.log(error);
        }
    };

    const getNftTokenData = async () => {
        try {
            let nftData = await getAllNftData();
            var data = Object.keys(nftData).map((key) => nftData[key]);
            let arr = [];
            let n = data.length;
            for (let i = 0; i < n; i++) {
                console.log(data[i].data.uri);
                let val = await axios.get(data[i].data.uri); //json metadata gets its own uri
                //let val = await axios.get(valprev.image);
                console.log("ggg");
                console.log(data[i].data.uri);
                arr.push(val);
            }
            nftData.map((val, ind) => {
                console.log(val);
            })
            return arr;
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <section className='nft mt-2 my-5'>
        {phantomState?(
            <div className="container text-center">
                <div className="row">
                {loading?(
                    <>
                        <div className="row text-center">
                            <div className="col-12">
                                <h4 className="title">NFT</h4>
                            </div>
                        </div>
                        {nftData && nftData.length > 0 && nftData.map((val, ind) => {
                            if(val.data.properties.category === 'image')
                                return(
                                    <div className="col-4 mt-3" key={ind}>
                                        <img className='w-100' src={val.data.image} alt="loading..." />
                                        <p className="mt-1">{val.data.name}</p>
                                        <h6 className=" mt-2">
                                            {val.data.symbol}
                                        </h6>
                                    </div>
                                );
                            else 
                            {
                                return(
                                    <div className="col-4 mt-3" key={ind}>
                                    <ModelLoader url={val.data.properties.files[0].uri}/>
                                    <p className="mt-1">{val.data.name}</p>
                                    <h6 className=" mt-2">
                                    {val.data.symbol}
                                    </h6>
                                    </div>
                                );
                            }
                        })}
                    </>)
                    :(
                    <>
                        <p className="text-center">loading...</p>
                    </>)}
                </div>
            </div>
            ):
            (
            <h3>
                PHANTOM WALLET NOT CONNNECTED!!!
            </h3>
            )}
    </section>
    )
}