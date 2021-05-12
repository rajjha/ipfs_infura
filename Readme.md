**This decentralized App (dApp) will take a file (audio,video,doc,images) as input from a user and upload it to the IPFS by invoking an Ethereum contract. The hash of the file will be stored on Ethereum.**

In this repo I am keeping the contents of ipfs.sol contract and files inside /src folder. We first have to create a react app using the following instruction and then have add/update content of react app /src directory with this directory /src files.

**Implementation:**
React — Front end library
Solidity — Ethereum smart contract language
IPFS — Decentralized storage
Infura —API access to IPFS



**Preparation:** 

Download Metamask from https://metamask.io/ , setup and create account. Connect the metamask to the ethereum ropsten network.
Get ropesten test tokens from Faucet account - https://faucet.ropsten.be/ 

**Update Node and NPM**

$brew update && brew upgrade node && npm install -g npm

**Install Dependencies using Terminal:**

$npm i -g create-react-app
$npm install react-bootstrap
$npm install fs-extra
$npm install ipfs-api
$npm install web3
$npm install --save reactstrap

**Create react app: **

Create a project directory say “eth_lab” and generate a react app inside it. Name react app as “ipfs_infura”
$mkdir eth_lab
$cd eth_lab
$create-react-app ipfs_infura

**Deploy the smart contract to Ropsten Network:**

Go to https://remix.ethereum.org
Create a .sol file there with any name (say ipfs.sol). Paste following contract content to file. You can also copy content from repo file ipfs.sol.

pragma solidity ^0.8.1;
contract Contract { 
string ipfsHash;  
function setHash(string memory x) 
public {   
 ipfsHash = x;
} 
function getHash() 
public view returns (string memory x) 
{   
return ipfsHash; 
}
}

**Make sure your metamask is connected to the Ropsten network.
Deploy the contract to the ropsten network with configuration shown in picture below.**

![alt text](https://github.com/rajjha/ipfs_infura/blob/master/Remix%20Contract%20Deploy.png?raw=true)

Save the deployed contract address and ABI (Application binary interface) Json definition.

In my case:
Deployed Contract address is: 0xa99560c8fb01da6b66626938b61ce46d5cf36fa7
Json ABI is: 


[    {
        "inputs": [],
        "name": "getHash",
        "outputs": [
            {
                "internalType": "string",
                "name": "x",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "x",
                "type": "string"
            }
        ],
        "name": "setHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

**Write code for React app:**
Open the react app in your favorite editor and add/update the App.css, App.js, index.js web3.js, ipfs.js, and storehash.js files with content present in this directories /src files. Only change that you have to perform is to add your deployed contract address and ABI to storehash.js file. i.e

const address = <Your contract address>;
const abi = <Your contract ABI>


**And that is all!**
Start your react app with command : npm start
Access the application on : http://localhost:3000/ 
