var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

var defaultAccount;
var contractAddress = "0x6d3704f35a49f5027323D9B526EE69007a124dE6";
var abi = JSON.parse('[ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getInfo", "outputs": [ { "name": "", "type": "string", "value": "teste evento" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xe29c9ae4e6ea590a34b008954289a3b5da9afe36" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_info", "type": "string" } ], "name": "setInfo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_info", "type": "string" } ], "name": "InfoChanged", "type": "event" } ]');

RegisterContract = web3.eth.contract(abi);
Register = RegisterContract.at(contractAddress);

web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
        //alert("Error searching accounts.");
        console.log("Error searching accounts.");
        return;
    }

    if (accounts.length == 0) {
        //alert("No account! Check if Ethereum client is set correctly.");
        console.log("No account! Check if Ethereum client is set correctly.");
        return;
    }

    //console.log(accounts);
    defaultAccount = accounts[0];
    web3.eth.defaultAccount = accounts[0];
});

// Changes the info data on deployed contract
function newRegister(event) {
    event.preventDefault();

    var info = event.target.elements['info'].value;
    Register.setInfo(info, {from: defaultAccount, gas: 1000000});
    
    event.target.elements['info'].value = '';
    event.target.elements['info'].focus(); 
}

// Watches the event InfoChanged
function watchEvent() {
    var infoEvent = Register.InfoChanged();
    infoEvent.watch((err, result) => {
        if (! err) {
            console.log(result);
        } else {
            console.log(err);
        }
    });
}
