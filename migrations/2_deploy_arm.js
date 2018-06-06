var ARMCoin = artifacts.require("./ARMCoin.sol");


module.exports = function(deployer) {
    deployer.deploy(ARMCoin);
};
