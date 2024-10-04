# Healthcare Data Provenance System Using Blockchain and Merkle Trees

## Overview
This project implements a blockchain-based healthcare data provenance system using smart contracts and Merkle trees to ensure data integrity and security. The project aims to provide a decentralized and tamper-proof way of tracking and verifying the origin, access, and modification of healthcare data. By using a Merkle tree structure, we can efficiently verify data integrity and detect any unauthorized changes. The system is developed using Solidity for the smart contract, React for the frontend, and Ganache as the local blockchain environment.

## Features
- **Data Provenance Tracking**: Add and track healthcare data records (hashes) on the blockchain.
- **Merkle Tree**: Computes a Merkle tree in the frontend to create a cryptographic root that represents the integrity of all data.
- **Data Integrity Verification**: Uses the Merkle root to verify the integrity of the data records stored on the blockchain.
- **Frontend Interface**: User-friendly interface built using React for adding records and updating the Merkle root.
- **Smart Contract**: Solidity smart contract deployed on a local blockchain (Ganache) to store healthcare data hashes securely.

## System Architecture
The system consists of the following components:
1. **Frontend**: A React application that provides an interface for users to add healthcare data records and view the Merkle root.
2. **Smart Contract**: A Solidity contract that stores data records and allows for updating and retrieving the Merkle root.
3. **Blockchain Network (Ganache)**: A local blockchain environment that simulates the Ethereum network for deploying and testing the smart contract.

## Project Workflow
1. The user inputs a data hash and an action (e.g., "created") into the frontend.
2. The frontend computes the Merkle root using the `merkletreejs` library.
3. A transaction is sent to the smart contract to add the new data record.
4. The smart contract stores the data record on the blockchain.
5. The frontend displays the total records and the current Merkle root, allowing users to verify data integrity.

## Environmental Setup

This section provides a step-by-step guide for setting up the development environment needed to run this project. Please ensure all prerequisites are installed before proceeding.

### Prerequisites
- *Node.js*: Install Node.js (v16.x or higher) from [Node.js official website](https://nodejs.org/).
- *npm*: Node Package Manager, comes with Node.js installation.
- *Truffle*: A development environment, testing framework, and asset pipeline for Ethereum.
- *Ganache*: A personal blockchain for Ethereum development.
- *MetaMask*: A browser extension for Ethereum interactions.
- *Git*: Version control system for cloning the project repository.

### 1. Install Node.js and npm
- Download and install Node.js from the [official website](https://nodejs.org/). This will also install npm (Node Package Manager) which is required for managing dependencies.

### 2. Install Truffle
- Truffle is used for compiling, deploying, and testing the smart contracts.
- Open a terminal and run the following command to install Truffle globally:
  ```bash
  npm install -g truffle

## Team Contributions
This project was a collaborative effort by a team of 5 members. Each member's contributions are outlined below:

### 1. **Santhoshi R (21Z251)** - Smart Contract Development
- Implemented the core smart contract using Solidity to handle healthcare data records.
- Developed functions for adding data records, updating the Merkle root, and retrieving the total records.
- Ensured the contract's compatibility with Ethereum standards and implemented appropriate data structures.

### 2. **Shruti S (21Z256)** - Frontend Development
- Built the React frontend to provide a user-friendly interface for interacting with the blockchain.
- Integrated `web3.js` to enable communication between the frontend and the smart contract.
- Developed forms and components for adding data records and displaying the Merkle root and total record count.

### 3. **Madhumitha D R (21Z228)** - Merkle Tree Implementation
- Implemented the Merkle tree functionality in the frontend using the `merkletreejs` library and `keccak256` hashing algorithm.
- Computed the Merkle root each time a new record was added and integrated it with the smart contract.
- Assisted in debugging issues related to data hashing and Merkle root calculation.

### 4. **Roshini P (21Z245)** - Blockchain Integration and Testing
- Set up the local blockchain environment using Ganache and assisted in deploying the smart contract.
- Tested the smart contract functions by executing transactions on the Ganache blockchain.
- Verified data integrity by simulating different scenarios, ensuring the smart contract correctly handled data records.

### 5. **Hemali M (21Z225)** - Documentation and Project Management
- Managed the project's timeline, tasks, and team collaboration.
- Created detailed documentation, including the project overview, architecture, workflow, and system design.
- Assisted with setting up the GitHub repository and preparing the `README.md` file for the project.

## Future Enhancements
- **Data Encryption**: Integrate encryption algorithms in the frontend to secure data before storing it on the blockchain.
- **Access Control**: Implement a role-based access control mechanism in the smart contract to restrict data modifications to authorized accounts.
- **Off-Chain Storage**: Use off-chain storage solutions like IPFS for large healthcare data while storing only data hashes on the blockchain.
- **Public Blockchain Integration**: Deploy the project on a public Ethereum test network for real-world testing.
- **Merkle Proof Verification**: Add frontend functionality for users to verify the inclusion of specific data in the Merkle tree using Merkle proofs.
