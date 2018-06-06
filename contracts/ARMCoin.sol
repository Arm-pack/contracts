pragma solidity ^0.4.11;


import "../node_modules/zeppelin-solidity/contracts/token/BurnableToken.sol";


contract ARMCoin is BurnableToken {

  string public name = "ARMcoin";
  string public symbol = "ARM";
  uint public decimals = 8;
  uint public INITIAL_SUPPLY = 1000000000 * 10**8;  // 1 billion tokens

  /**
   * @dev Contructor that gives msg.sender all of existing tokens.
   */
  function ARMCoin() {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }
}
