// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract TxOriginUtil {
  function sendEthToTxOrigin() external payable {
    bool sent = payable(tx.origin).send(msg.value);
    require(sent, "Failed to send Ether");
  }

  function sendTokenToTxOrigin(IERC20 token, uint256 amount) external {
    token.transferFrom(msg.sender, tx.origin, amount);
  }
}
