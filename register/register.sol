pragma solidity ^0.4.19;

contract Register {
    address public owner;
    bytes32 private info;

    function register() public {
        owner = msg.sender;
    }
    
    function setInfo(bytes32 _info) public {
        info = _info;
    }
    
    function getInfo() public view returns (bytes32 _info) {
        return info;
    }
	
     /**********
     Standard kill() function to recover funds 
     **********/    
    function kill() public { 
        if (msg.sender == owner)  // only allow this action if the account sending the signal is the creator / owner
            selfdestruct(owner);
    }
	
}