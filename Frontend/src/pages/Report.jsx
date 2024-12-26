import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { Alert, AlertDescription } from '@/components/ui/alert';

// IPFS client setup
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

// Smart contract ABI - Replace with your actual ABI
const contractABI = [
  "function uploadReport(address patient, string memory ipfsHash, uint256 price) public",
  "function completePayment(string memory ipfsHash) public payable",
  "function getReportDetails(string memory ipfsHash) public view returns (address, uint256, bool)"
];

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address

const Report = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientAddress, setPatientAddress] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  
  // Connect to Ethereum provider and contract
  const connectContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      return contract;
    } catch (error) {
      setStatus('Error connecting to wallet: ' + error.message);
      return null;
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file to IPFS
  const uploadToIPFS = async () => {
    try {
      const added = await ipfs.add(file);
      return added.path;
    } catch (error) {
      throw new Error('Error uploading to IPFS: ' + error.message);
    }
  };

  // Handle report upload
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file || !patientAddress || !price) {
      setStatus('Please fill in all fields');
      return;
    }

    setLoading(true);
    setStatus('Processing...');

    try {
      // 1. Upload to IPFS
      const ipfsHash = await uploadToIPFS();
      
      // 2. Connect to contract
      const contract = await connectContract();
      if (!contract) return;

      // 3. Upload report details to smart contract
      const priceInWei = ethers.utils.parseEther(price);
      const tx = await contract.uploadReport(patientAddress, ipfsHash, priceInWei);
      await tx.wait();

      setStatus('Report uploaded successfully! IPFS Hash: ' + ipfsHash);
      setFile(null);
      setPatientAddress('');
      setPrice('');
    } catch (error) {
      setStatus('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Medical Report</h1>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block mb-2">Patient Ethereum Address:</label>
          <input
            type="text"
            value={patientAddress}
            onChange={(e) => setPatientAddress(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="0x..."
          />
        </div>

        <div>
          <label className="block mb-2">Price (ETH):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            step="0.001"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-2">Report File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            accept=".pdf,.doc,.docx"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Processing...' : 'Upload Report'}
        </button>
      </form>

      {status && (
        <Alert className="mt-4">
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Report;