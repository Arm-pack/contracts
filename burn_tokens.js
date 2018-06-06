// example usage: truffle exec burn_tokens.js --network test 1

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


module.exports = function(callback) {
    var amount = parseInt(process.argv[6]);

    var coinContract = artifacts.require("./ARMCoin.sol");
    var coin = coinContract.at(coinContract.address);

    coin.decimals().then(function(r){
        var decimals = r['c'][0];
        var amount_with_decimals = amount * Math.pow(10, decimals);
        var decimals = '0'.repeat(decimals);

        rl.question('Do you want to burn: ' + amount.toString() + '.' + decimals + ' tokens. Type y/yes: ', function(answer) {
            rl.close();

            var a = answer.toLowerCase();
            if ((a === 'y') || (a === 'yes')) {
                coin.burn(amount_with_decimals).then(function () {
                    console.log('Burn tokens ' + amount.toString() + '.' + decimals );
                    callback();
                });
            } else {
                console.log('Canceled');
                callback();
            }
        });
    });
};