import { ethers } from "hardhat";

import { TxOriginUtil__factory } from "../typechain-types/index";

async function main() {
  const [signer] = await ethers.getSigners();

  const txOriginUtil = TxOriginUtil__factory.connect(
    '0x5c19B58e84Eedfd684002e0900f2418641850517',
    signer,
  );

  const startTime = Date.now();

  console.log({ startTime });

  const intervalId = setInterval(() => {
    console.log(Date.now() - startTime, 'ms since start');
  }, 5000);

  const tx = await txOriginUtil.sendEthToTxOrigin({
    value: ethers.utils.parseEther('0.000100'),
  });

  console.log({ tx });

  const recpt = await tx.wait();
  console.log({ recpt });

  clearInterval(intervalId);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
