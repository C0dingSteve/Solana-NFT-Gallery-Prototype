# Solana-NFT-Gallery-Prototype

A simple NFT gallery prototype on the Solana blockchain

## Prerequisites & Dependencies

- Run `git clone <repo>`
- Make sure you have latest yarn installed
- Run `yarn install` to update dependencies

## Setting up the environment file

- Create a file named `.env` in the root directory
- Copy paste the following text in the `.env` file

```
REACT_APP_FIREBASE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=XXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_PROJECT_ID=XXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_STORAGE_BUCKET=XXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_APP_ID=XXXXXXXXXXXXXXXXXXXXXXXX

REACT_APP_CANDY_MACHINE_CONFIG=XXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_CANDY_MACHINE_ID=XXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_TREASURY_ADDRESS=XXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_CANDY_START_DATE=XXXXXXXXXXXXXXXXXXXXXXXX

REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_SOLANA_RPC_HOST=https://explorer-api.devnet.solana.com
```

- Configure the environment variables with your own firebase settings and candymint settings. Use [Metaplex](https://github.com/metaplex-foundation/metaplex) to upload your files to IPFS and create a candymachine, then fill in the `.env` file.

- Once the environment variables are set up and your files are uplodaed to IPFS through Metaplex, use [Candy Machine Mint](https://github.com/exiled-apes/candy-machine-mint) to mint.

- The minted NFTs can then be viewed using the `View NFT` button in the Dashboard

![Example Image](https://drive.google.com/uc?export=view&id=1jHbfNJS0i5053StwgE7vTlTKuWb38JBM)
