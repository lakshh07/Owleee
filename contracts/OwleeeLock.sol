// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

library SafeMath {
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }

    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x - y) <= x, "ds-math-sub-underflow");
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }
}

contract OwleeeLock is ReentrancyGuard {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _lockCount;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Lock {
        uint256 id;
        address userLockAddress;
        address user;
    }

    mapping(address => string) private userProfileHash;
    mapping(uint256 => Lock) private idToLockAddress;

    event LockAddressUploaded(
        uint256 id,
        address userLockAddress,
        address user
    );

    function uploadUserHash(string memory _userHash) external nonReentrant {
        require(bytes(_userHash).length > 0, "User Hash not found");

        userProfileHash[msg.sender] = _userHash;
    }

    function fetchUserProfileHash() external view returns (string memory) {
        return userProfileHash[msg.sender];
    }

    function uploadLockAddress(address _lockAddress) external nonReentrant {
        require(msg.sender != address(0), "Sender Address not found");
        require(_lockAddress != address(0), "Lock Address not found");

        _lockCount.increment();
        uint256 lockCount = _lockCount.current();

        idToLockAddress[lockCount] = Lock(lockCount, _lockAddress, msg.sender);

        emit LockAddressUploaded(lockCount, _lockAddress, msg.sender);
    }

    function fetchUserLockAddress() external view returns (Lock[] memory) {
        uint256 totalLockCount = _lockCount.current();
        uint256 userLockCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalLockCount; i++) {
            if (idToLockAddress[i.add(1)].user == msg.sender) {
                userLockCount += 1;
            }
        }

        Lock[] memory locks = new Lock[](userLockCount);

        for (uint256 i = 0; i < totalLockCount; i++) {
            if (idToLockAddress[i.add(1)].user == msg.sender) {
                uint256 currentId = i.add(1);
                Lock storage currentLock = idToLockAddress[currentId];
                locks[currentIndex] = currentLock;
                currentIndex += 1;
            }
        }
        return locks;
    }
}
