pragma solidity ^0.4.23;

contract Register {

    address public owner;
    string private info;

    event InfoChanged(string _info);

    constructor() public {
        owner = msg.sender;
    }

    function setInfo(string _info) public {
        info = _info;
        emit InfoChanged(_info);
    }

    function getInfo() public view returns (string) {
        return info;
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
