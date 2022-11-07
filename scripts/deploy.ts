import { ethers } from "hardhat";

async function main() {
  console.log('Deploying TxOriginUtil');

  const TxOriginUtil = await ethers.getContractFactory("TxOriginUtil");
  const txOriginUtil = await TxOriginUtil.deploy();

  console.log('Got pending contract (unconfirmed tx?)', txOriginUtil.address);

  await txOriginUtil.deployed();

  console.log(`TxOriginUtil deployed to ${txOriginUtil.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
