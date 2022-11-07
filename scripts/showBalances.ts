import { ethers } from "hardhat";
import { ApproverSCW__factory } from "../typechain-types";

const scwAddr = '0x426ebdfd85A021780563508D2E8e8705be9A21B6';

async function main() {
  const eoa = (await ethers.getSigners())[0];
  const wallet = ApproverSCW__factory.connect(scwAddr, eoa);

  console.log({
    balanceAfter: ethers.utils.formatEther(await eoa.getBalance()),
    cost: ethers.utils.formatEther(await ethers.provider.getBalance(wallet.address)),
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
