var EasyWallet = artifacts.require("EasyWallet");

contract("EasyWallet", function(accounts) {
  it("EasyWallet should be deployed", function(done) {
    var easyWallet = EasyWallet.deployed();
    assert.isTrue(true);
    done();
  });
});

contract("EasyWallet", accounts => {
  it("Should store value", () => {
    var easyWalletInstance;
    var key = accounts[0];
    var privateKeyEncrypted =
"{" +
"   version: 3," +
"   id: '4923d5e3-d61f-459e-8e65-e945ddff82c3'," +
"   address: '30d8ed54819116f073123b9fe67420e435fd232a'," +
"   crypto: {" +
"     ciphertext: '2b46d3b58449e4777501bfa1e364083c215f27e0db639bd33f4a2661bc39fe5a'," +
"     cipherparams: { iv: '9e86d9cc5f723c6ba9ebf222f13ffb86' }," +
"     cipher: 'aes-128-ctr'," +
"     kdf: 'scrypt'," +
"     kdfparams: {" +
"       dklen: 32," +
"       salt: '4660b7f5c246c41508eead65bb417ffb54bc1dd16d2ae99616b8cafc9690f691'," +
"       n: 8192," +
"       r: 8," +
"       p: 1" +
"     }," +
"     mac: '61a354fdafd3b1a798b6931577b6e51fb30e953c033c4c9f965bc2f415a510e3'" +
"   }" +
" }";

    return EasyWallet.deployed()
      .then(instance => {
        easyWalletInstance = instance;
      })
      .then(() => {
        return easyWalletInstance.getValue(key);
      })
      .then(val => {
        assert.equal(
          val,
          '',
          "Value wasn't empty"
        );
      })
      .then(() => {
        easyWalletInstance.setValue(key, privateKeyEncrypted);
        return easyWalletInstance.getValue(key);
      })
      .then(val => {
        assert.equal(
          val,
          privateKeyEncrypted,
          "Value was wrong"
        );
      });
  });
});
