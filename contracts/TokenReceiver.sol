// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TokenReceiver
 * @dev Very simple example of a contract receiving ERC20 tokens.
 */
contract TokenReceiver {

    IERC20 private _token;
    
    event premioTokenDado(address recipient);

    constructor (IERC20 token)  {
        _token = token;
    }

    function premioToken() external {
        address from = msg.sender;
        _token.transferFrom(from, address(this), 1);
        emit premioTokenDado(from);
    } 
}