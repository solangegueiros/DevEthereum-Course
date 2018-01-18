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
	
     /**********
     Standard kill() 
     **********/    
    function kill() public { 
        if (msg.sender == owner)  // only allow this action if the account sending the signal is the creator / owner
            selfdestruct(owner);
    }
	
}
