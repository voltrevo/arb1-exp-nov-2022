import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const accounts = {
  mnemonic: `${process.env.MAIN_MNEMONIC}`,
  count: 5,
};

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    arbitrum: {
      // url: 'https://arbitrum-mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8',
      url: 'https://arb1.arbitrum.io/rpc',
      accounts,
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      accounts,
    },
    hardhat: {
      chainId: 31337,
    },
    gethDev: {
      url: `http://localhost:8545`,
    },
  },
};

export default config;
