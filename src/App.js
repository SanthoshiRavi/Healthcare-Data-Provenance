import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import HealthcareDataContract from './HealthcareData.json'; // Import the contract's ABI
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import { Buffer } from 'buffer'; // Import Buffer polyfill
import './App.css'; // Import custom CSS

window.Buffer = Buffer; // Polyfill Buffer for the browser

const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [inputHash, setInputHash] = useState('');
  const [inputAction, setInputAction] = useState('');
  const [merkleRoot, setMerkleRoot] = useState('');
  const [records, setRecords] = useState([]);

  // Function to connect to MetaMask and the blockchain
  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();

          const accounts = await web3.eth.getAccounts();
          if (accounts.length === 0) {
            throw new Error('No accounts found in MetaMask.');
          }
          setAccount(accounts[0]);

          const networkId = await web3.eth.net.getId();
          const deployedNetwork = HealthcareDataContract.networks[networkId];
          if (deployedNetwork) {
            const contractInstance = new web3.eth.Contract(
              HealthcareDataContract.abi,
              deployedNetwork.address
            );
            setContract(contractInstance);

            // Fetch the total records initially
            const total = await contractInstance.methods.getTotalRecords().call();
            setTotalRecords(total);
          } else {
            throw new Error('Smart contract not deployed on the detected network.');
          }
        } else {
          throw new Error('Please install MetaMask!');
        }
      } catch (error) {
        console.error('Error loading blockchain data:', error);
        alert(`Error: ${error.message}`);
      }
    };

    loadBlockchainData();
  }, []);

  // Function to compute the Merkle root whenever records change
  useEffect(() => {
    if (records.length > 0) {
      computeMerkleRoot();
    }
  }, [records]); // Runs whenever the 'records' state changes

  // Function to compute the Merkle root
  const computeMerkleRoot = () => {
    const leaves = records.map(record => keccak256(Buffer.from(record.dataHash)));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = tree.getRoot().toString('hex');
    setMerkleRoot(root);
    return root;
  };

  // Function to update the Merkle root on the blockchain
  const updateMerkleRootOnBlockchain = async () => {
    if (contract) {
      try {
        if (merkleRoot) {
          await contract.methods.updateMerkleRoot(`0x${merkleRoot}`).send({ from: account });
          alert('Merkle root updated successfully on the blockchain!');
        } else {
          alert('No Merkle root to update.');
        }
      } catch (error) {
        console.error('Error updating Merkle root:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  // Function to add a new data record
  const addDataRecord = async () => {
    if (!inputHash || !inputAction) {
      alert('Please provide both data hash and action.');
      return;
    }

    if (contract) {
      try {
        await contract.methods.addDataRecord(inputHash, inputAction).send({ from: account });
        // Update the records state with the new entry
        setRecords(prevRecords => [...prevRecords, { dataHash: inputHash, action: inputAction }]);

        // Fetch the updated total records
        const total = await contract.methods.getTotalRecords().call();
        setTotalRecords(total);
        alert('Data record added successfully!');
      } catch (error) {
        console.error('Error adding data record:', error);
        alert(`Error: ${error.message}`);
      }
    } else {
      alert('Contract is not loaded.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">Healthcare Data Provenance</h1>
      <div className="account-info">
        <p><strong>Connected Account:</strong> {account}</p>
        <p><strong>Total Records:</strong> {totalRecords}</p>
      </div>
      
      <div className="input-section">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Data Hash"
          value={inputHash}
          onChange={(e) => setInputHash(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Enter Action (e.g., created)"
          value={inputAction}
          onChange={(e) => setInputAction(e.target.value)}
        />
        <button className="button" onClick={addDataRecord}>Add Data Record</button>
      </div>

      <div className="merkle-section">
        <h2>Merkle Root</h2>
        <p className="merkle-root">{merkleRoot ? `0x${merkleRoot}` : "No Merkle Root Computed Yet"}</p>
        <button className="button" onClick={updateMerkleRootOnBlockchain}>Update Merkle Root on Blockchain</button>
      </div>
    </div>
  );
};

export default App;