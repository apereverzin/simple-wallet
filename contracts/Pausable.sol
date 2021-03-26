// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./Context.sol";
import "./Ownable.sol";

abstract contract Pausable is Context, Ownable {
    event Paused(address account);

    bool private _paused;

    constructor () {
        _paused = false;
    }

    function paused() public view returns (bool) {
        return _paused;
    }

    function kill() public onlyOwner {
        _pause();
    }

    modifier whenNotPaused() {
        require(!_paused, "Pausable: paused");
        _;
    }

    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }
}
