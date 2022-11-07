// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

struct Action {
  address to;
  uint256 value;
  bytes data;
}

contract ApproverSCW {
  address owner;
  bytes32 approvedActionsHash;

  constructor() {
    owner = msg.sender;
  }

  receive() external payable {}

  function approve(bytes32 actionsHash) external {
    require(msg.sender == owner);
    approvedActionsHash = actionsHash;
  }

  function perform(Action[] calldata actions) external {
    require(keccak256(abi.encode(actions)) == approvedActionsHash);
    approvedActionsHash = 0;

    for (uint i = 0; i < actions.length; i++) {
      Action calldata a = actions[i];
      bool success;

      if (a.value > 0) {
        (success, ) = payable(a.to).call{value: a.value}(a.data);
      }
      else {
        (success, ) = address(a.to).call(a.data);
      }

      require(success);
    }
  }
}
