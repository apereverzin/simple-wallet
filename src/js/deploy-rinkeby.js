var Web3 = require('web3');
var abijs = require('ethereumjs-abi');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx').Transaction;
var ethereumjs_common = require ('ethereumjs-common').default;
var fs = require('fs');
var secrets = require('./secrets/secrets.js');

var projectId = secrets.getProjectId();

var connection = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId));

var adminAccount = secrets.getAdminAccount();
var adminPrivateKey = secrets.getAdminPrivateKey();

var contractJson = JSON.parse(fs.readFileSync('./build/contracts/EasyWallet.json', 'utf8'));
var contractAbi = contractJson.abi;
var contractByteCode = contractJson.bytecode.toString();
var contractContract = new connection.eth.Contract(contractAbi);

var contractAddress;

function sendRaw(rawTx, key) {
    var privateKey = Buffer.from(key, 'hex');
    var transaction = new tx(rawTx, {'chain': 'rinkeby'});
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    connection.eth.sendSignedTransaction(
      '0x' + serializedTx, function(err, result) {
        if(err) {
          console.log('error: ' + err);
        } else {
          console.log('tx hash: ' + result);
        }
      }
    ).then(receipt => {
        contractAddress = receipt.contractAddress;
        console.log('contract address: ' + contractAddress);
    });
}

var contractParameterTypes = []
var contractParameterValues = []
var contractEncoded = abijs.rawEncode(contractParameterTypes, contractParameterValues)
var contractParams = contractEncoded.toString('hex')

connection.eth.getTransactionCount(adminAccount).then(n => {
  var contractRawTx = {
    nonce: connection.utils.toHex(n),
    gasLimit: connection.utils.toHex(5000000),
    gasPrice: connection.utils.toHex(40000000000),
    data: contractByteCode + contractParams
  }
  sendRaw(contractRawTx, adminPrivateKey);
});
