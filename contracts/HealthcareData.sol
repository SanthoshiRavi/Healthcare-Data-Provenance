// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthcareData {
    // Struct to store healthcare data provenance
    struct DataRecord {
        address owner;
        string dataHash;  // A hash representing the data for integrity
        uint256 timestamp;
        string action;    // Description of action (e.g., "created", "modified", "accessed")
    }

    // Array to store data records
    DataRecord[] public dataRecords;

    // Merkle root storage
    bytes32 public merkleRoot;

    // Event to track provenance actions
    event DataProvenance(
        address indexed owner,
        string dataHash,
        uint256 timestamp,
        string action
    );

    // Function to add a new data record
    function addDataRecord(string memory _dataHash, string memory _action) public {
        DataRecord memory newRecord = DataRecord({
            owner: msg.sender,
            dataHash: _dataHash,
            timestamp: block.timestamp,
            action: _action
        });
        dataRecords.push(newRecord);
        emit DataProvenance(msg.sender, _dataHash, block.timestamp, _action);
    }

    // Function to update the Merkle root
    function updateMerkleRoot(bytes32 _merkleRoot) public {
        merkleRoot = _merkleRoot;
    }

    // Function to get the total number of records
    function getTotalRecords() public view returns (uint256) {
        return dataRecords.length;
    }

    // Function to retrieve a specific data record
    function getDataRecord(uint256 _index) public view returns (address, string memory, uint256, string memory) {
        require(_index < dataRecords.length, "Invalid index");
        DataRecord memory record = dataRecords[_index];
        return (record.owner, record.dataHash, record.timestamp, record.action);
    }
}