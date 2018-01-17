// NOTE: Need to compile with browserify temp.js -o main.js
var SolidityCoder = require("C:\\Ethereum\\projetos\\register\\node_modules\\web3\\lib\\solidity\\coder.js");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


var accounts;
var account;
var contractAddress = '0x5b66a4aa4fa69c207eca729666ed493f73eb99a0';

var abi = JSON.parse( '[ { "constant": false, "inputs": [], "name": "register", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getInfo", "outputs": [ { "name": "_info", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_info", "type": "bytes32" } ], "name": "setInfo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]' );
var functionHashes = getFunctionHashes(abi);

baseContract = web3.eth.contract(abi);
contract = baseContract.at(contractAddress);

var $ = jQuery;

$(document).ready(function() {  
    //Get transactions by account
    getTransactionsByAccount(web3.eth.accounts[0]);	
});


function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
    if (endBlockNumber == null) {
        endBlockNumber = web3.eth.blockNumber;
        console.log("Using endBlockNumber: " + endBlockNumber);
    }  
    if (startBlockNumber == null) {
        if (endBlockNumber < 1001)
            startBlockNumber = 1;
        else
            startBlockNumber = endBlockNumber - 1000;
        console.log("Using startBlockNumber: " + startBlockNumber);
    }
    console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
    
    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
        console.log("Searching block " + i);

        var block = web3.eth.getBlock(i, true);
        if (block != null && block.transactions != null) {
          block.transactions.forEach( function(e) {
            if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
              console.log("  tx hash          : " + e.hash + "\n"
                + "   nonce           : " + e.nonce + "\n"
                + "   blockHash       : " + e.blockHash + "\n"
                + "   blockNumber     : " + e.blockNumber + "\n"
                + "   transactionIndex: " + e.transactionIndex + "\n"
                + "   from            : " + e.from + "\n" 
                + "   to              : " + e.to + "\n"
                + "   value           : " + e.value + "\n"
                + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
                + "   gasPrice        : " + e.gasPrice + "\n"
                + "   gas             : " + e.gas + "\n"
                + "   input           : " + e.input);

                // Decode from			
                var from = e.from==account ? "me" : e.from;
        
                // Decode function
                var func = findFunctionByHash(functionHashes, e.input);

                if (func == 'setInfo') {
                    var inputData = SolidityCoder.decodeParams(["bytes32"], e.input.substring(10)); 
                    console.log(
                        + "Info: " + inputData[0] + "\n" );

                    $('#transactions').append('<tr><td>' + e.blockNumber +
                    '</td><td>' + block.timestamp + ": " + new Date(block.timestamp * 1000).toGMTString() +
                    '</td><td>' + web3.toAscii( inputData[0]).toString() +
                    '</td></tr>');
                }
            }
          })
        }
    }                  
}

// Get function hashes
function getFunctionHashes(abi) {
    var hashes = [];
    for (var i=0; i<abi.length; i++) {
      var item = abi[i];
      if (item.type != "function") continue;
      var signature = item.name + "(" + item.inputs.map(function(input) {return input.type;}).join(",") + ")";
      var hash = web3.sha3(signature);
      console.log(item.name + '=' + hash);
      hashes.push({name: item.name, hash: hash});
    }
    return hashes;
  }
  
  function findFunctionByHash(hashes, functionHash) {
    for (var i=0; i<hashes.length; i++) {
      if (hashes[i].hash.substring(0, 10) == functionHash.substring(0, 10)){
          //alert(hashes[i].name);
        return hashes[i].name;
      }
    }
    return null;
  }
