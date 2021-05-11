import React, { Component } from 'react';
import web3 from './web3';
import ipfs from './ipfs';
import './App.css';
import storehash from './storehash';
import { Button } from 'reactstrap';
class App extends Component {
//state = {      ipfsHash:null,      buffer:'',      ethAddress:'',      transactionHash:'',      txReceipt: ''    };
state = {
    ipfsHash:null,
    buffer:'',
    ethAddress:'',
    blockNumber:'',
    transactionHash:'',
    gasUsed:'',
    txReceipt: ''
  };
//Take file input from 
usercaptureFile =(event) => {        
    event.stopPropagation();        
    event.preventDefault();       
    const file = event.target.files[0];      
    let reader = new window.FileReader();      
    reader.readAsArrayBuffer(file);       
    reader.onloadend = () => this.convertToBuffer(reader);      };
//Convert the file to buffer to store on IPFS 
convertToBuffer = async(reader) => {     
//file is converted to a buffer for upload to IPFS        
const buffer = await Buffer.from(reader.result);      
//set this buffer-using es6 syntax        
this.setState({buffer});    };
//ES6 async 
onClick = async () => {
    try{
            this.setState({blockNumber:"waiting.."});
            this.setState({gasUsed:"waiting..."});
    //get Transaction Receipt in console on click
    //See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
    await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
              console.log(err,txReceipt);
              this.setState({txReceipt});
            }); //await for getTransactionReceipt
    await this.setState({blockNumber: this.state.txReceipt.blockNumber});
            await this.setState({gasUsed: this.state.txReceipt.gasUsed});
          } //try
        catch(error){
            console.log(error);
          } //catch
 } //onClick
onSubmit = async (event) => {      event.preventDefault();
//bring in user's metamask account address      
const accounts = await web3.eth.getAccounts();    
//obtain contract address from storehash.js      
const ethAddress= await storehash.options.address;      
this.setState({ethAddress});    
//save document to IPFS,return its hash#, and set hash# to state      
await ipfs.add(this.state.buffer, (err, ipfsHash) => {      
    console.log("IPFSHash"+ipfsHash);   
    console.log(err,ipfsHash);        
    //setState by setting ipfsHash to ipfsHash[0].hash        
    this.setState({ ipfsHash:ipfsHash[0].hash });        
    // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract        
    //return the transaction hash from the ethereum contract        
    storehash.methods.setHash(this.state.ipfsHash).send({          
        from: accounts[0]        }, 
        (error, transactionHash) => {          
            console.log(error);   
            console.log(transactionHash); 
            this.setState({transactionHash});        
        });      })    };
render() {
return (        
<div className="App">          
<header className="App-header">            
<h1>Blockchain Hackathon 2021</h1> 
<h2>Ethereum Blockchain, IPFS, Metamask and Infura APIs</h2>          
</header>
<hr/>
<div id="main_text">
<grid>         
     <h2> Send a File to Inter Planetary File System </h2>          
     <form onSubmit={this.onSubmit}>            
     <h3 color="blue">Choose a file :</h3> <input              type = "file"              onChange = {this.usercaptureFile}            />            
      <br/><br/><br/>
      <Button  variant="primary" style={{ color: "black", background: "gray" }}            type="submit">             Submit to IPFS            </Button>          
      </form><hr/> 
      
              <table border="true" responsive border>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Values</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>IPFS Hash # stored on Eth Contract</td>
                            <td>{this.state.ipfsHash}</td>
                          </tr>
                          <tr>
                            <td>Ethereum Contract Address</td>
                            <td>{this.state.ethAddress}</td>
                          </tr>
                          <tr>
                            <td>Tx Hash # </td>
                            <td>{this.state.transactionHash}</td>
                          </tr>
                          <tr>
                            <td>Block Number # </td>
                            <td>{this.state.blockNumber}</td>
                          </tr>
                          <tr>
                            <td>Gas Used</td>
                            <td>{this.state.gasUsed}</td>
                          </tr>

                        </tbody>
                    </table> 
                    <br/><br/>    <hr/>   
                    <h2>Get Transaction Receipt :</h2> 
                    <Button variant="primary" style={{ color: "black", background: "gray" }} onClick = {this.onClick}> Get Transaction Receipt </Button>
                     </grid>    </div>   
                     </div>      
                     );    }}
                       export default App;








