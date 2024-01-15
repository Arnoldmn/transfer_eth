// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Transfer {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function sendEth(address[] calldata recipients, uint256[] calldata amounts) external payable onlyOwner {
        require(recipients.length == amounts.length, "Arrays must have the same length");

        for (uint256 i = 0; i < recipients.length; i++) {
            address payable to = payable(recipients[i]);
            uint256 amount = amounts[i];
            require(address(this).balance >= amount, "Insufficient contract balance");

            (bool success, ) = to.call{value: amount}("");
            require(success, "Transfer failed");
        }
    }

    receive() external payable {}
}

