var Web3 = require('web3');
var secrets = require('./secrets/secrets.js');

var projectId = secrets.getProjectId();

var connection = new Web3('http://127.0.0.1:7545');

var admin;
connection.eth.getAccounts()
    .then(accs => { admin = accs[0]; });

var account;
var privateKey;
var res = connection.eth.accounts.create();
account = res.address;
privateKey = res.privateKey;
console.log(privateKey);

var password = secrets.getPassword();
var encrypted = connection.eth.accounts.encrypt(privateKey, password);
console.log(encrypted);

var easyWalletJson = JSON.parse(fs.readFileSync('./build/contracts/EasyWallet.json', 'utf8'));
var easyWalletAbi = easyWalletJson.abi;
var easyWalletByteCode = easyWalletJson.bytecode.toString();
var easyWalletContract = new connection.eth.Contract(easyWalletAbi);

easyWalletContract.deploy({
    data: easyWalletByteCode
  }).send({
    from: admin,
    gas: 4700000
  }).then((deployedContract) => {
    easyWalletAddress = deployedContract.options.address;
    console.log(easyWalletAddress);
  }).catch(ex => {
    console.error(ex);
  });
