module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Port for Ganache (default: 7545)
      network_id: "*",       // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",      // Use the Solidity version your contract is written in
    }
  }
};