pragma solidity ^0.4.23;

contract Register {

    address public owner;
    bytes32 private info;

    constructor() public {
        owner = msg.sender;
    }

    function bytes32ToStr(bytes32 _bytes32) private pure returns (string) {
        // string memory str = string(_bytes32);
        // TypeError: Explicit type conversion not allowed from "bytes32" to "string storage pointer"
        // thus we should fist convert bytes32 to bytes (to dynamically-sized byte array)
        bytes memory bytesArray = new bytes(32);
        for (uint256 i = 0; i < 32; i++) {
            bytesArray[i] = _bytes32[i];
        }

        return string(bytesArray);
    }

    function setInfo(bytes32 _info) public {
        info = _info;
    }

    function getInfo() public constant returns (string) {
        return bytes32ToStr(info);
    }

    /*
     * Standard kill() function to recover funds 
     */    
    function kill() public {
        // only allow this action if the account sending the signal is the creator / owner
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
}
