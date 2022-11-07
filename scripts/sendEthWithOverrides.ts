import { ethers } from "hardhat";
import { ActionsHash } from "../Action";
import { ApproverSCW__factory, TxOriginUtil__factory } from "../typechain-types";

const scwAddr = '0x426ebdfd85A021780563508D2E8e8705be9A21B6';
const txOriginUtilAddr = '0x5c19B58e84Eedfd684002e0900f2418641850517';

async function main() {
  const [eoa, eoa2] = await ethers.getSigners();

  const balanceBefore = await eoa.getBalance();

  console.log({
    balanceBefore: ethers.utils.formatEther(balanceBefore),
  });

  debugger;
  const ack = await (eoa.sendTransaction({
    to: eoa2.address,
    value: ethers.utils.parseEther('0.0001'),
    // gasLimit: 140000,
    gasPrice: 50000000,
  }).catch((e: Error) => e));

  console.log({ ack });

  if (ack instanceof Error) {
    return;
  }

  await ack.wait();

  const balanceAfter = await eoa.getBalance();

  console.log({
    balanceAfter,
    cost: ethers.utils.formatEther(balanceBefore.sub(balanceAfter)),
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
