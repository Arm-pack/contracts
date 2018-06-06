var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var HDWalletProvider = require("truffle-hdwallet-provider");
var fs = require('fs');

// Get our mnemonic and create an hdwallet
var mnemonic = fs.readFileSync('mnemonic.txt').toString();
if ( ! mnemonic) {
    throw Exception('Please create mnemonic.txt file with mnemonic phrase');
}

var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/0";
var wallet = hdwallet.derivePath(wallet_hdpath).getWallet();
var address = "0x" + wallet.getAddress().toString("hex");
console.log(address);


module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        live: {
            gas: 1200000,
            gasPrice: 50000000000, // 50 Gwei
            provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/"),
            network_id: 1
        },
        ropsten: {
            gas: 1000000,
            gasPrice: 2000000000, // 2 Gwei
            provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
            network_id: 3 // official id of the ropsten network
        },
        test: {
            gas: 4712388,
            network_id: '*',
            host: "127.0.0.1",
            port: 7545
        }
    }
};
