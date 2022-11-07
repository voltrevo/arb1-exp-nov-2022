import { ethers } from "hardhat";

async function main() {
  console.log('Deploying ApproverSCW');

  const ApproverSCW = await ethers.getContractFactory("ApproverSCW");
  const approverSCW = await ApproverSCW.deploy();

  console.log('Got pending contract (unconfirmed tx?)', approverSCW.address);

  await approverSCW.deployed();

  console.log(`ApproverSCW deployed to ${approverSCW.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
