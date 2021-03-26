// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./Pausable.sol";

contract EasyWallet is Pausable {

    mapping (bytes => string) private _values;

    constructor() {
        _owner = _msgSender();
    }

    function setValue(bytes memory key_, string memory value_) public {
        _values[key_] = value_;
    }

    function getValue(bytes memory key_) public view returns (string memory) {
        return _values[key_];
    }
}
