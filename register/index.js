var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Código para interagir com o contrato
var accounts;
var account;

var contractAddress = '0x5b66a4aa4fa69c207eca729666ed493f73eb99a0';

var abi = JSON.parse( '[ { "constant": false, "inputs": [], "name": "register", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getInfo", "outputs": [ { "name": "_info", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_info", "type": "bytes32" } ], "name": "setInfo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]' );

baseContract = web3.eth.contract(abi);
contract = baseContract.at(contractAddress);

// Busca contas
web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
        alert("Ocorreu um erro ao buscar suas contas.");
        return;
    }

    if (accs.length == 0) {
        alert("Nenhuma conta encontrada! Verifique se o Ethereum client está configurado corretamente.");
        return;
    }

    accounts = accs;
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
});

function newRegister() {    
    info = $("#newInfo").val();
    //alert (info);
    contract.setInfo (info, {from:web3.eth.accounts[0], gas: 1000000}); 
    $("#newInfo").val('');
}


