# easy-wallet

- Rename `secrets_sample.js` to `secrets.js`
- In `secrets.js` replace all `'******'` entries with valid values (`getProjectId` should return ID of the project in Infura)
- In the root directory run `npm install`
- Run `node ./src/js/deploy-rinkeby.js`, it prints transaction hash, based on it find in `Etherscan` the address of `EasyWallet` contract, it should be used in `easy-app` project
 