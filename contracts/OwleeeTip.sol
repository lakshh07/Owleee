// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract OwleeeTip {
    event TipReceived(uint256 amount, address creator);

    uint256 public totalTip;

    function sendTip(address _creator) external payable {
        require(msg.value > 0, "Amount should be greater than 0.");
        require(msg.sender.balance >= msg.value, "Not enough balance");
        require(msg.sender != _creator, "Creator can not contribute");

        payable(_creator).transfer(msg.value);
        totalTip += msg.value;
        emit TipReceived(msg.value, _creator);
    }
}
