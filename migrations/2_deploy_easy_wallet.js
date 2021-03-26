const EasyWallet = artifacts.require("EasyWallet");

module.exports = function (deployer) {
  deployer.deploy(EasyWallet);
};
