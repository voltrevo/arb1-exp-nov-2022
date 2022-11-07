import { ethers } from "hardhat";
import { ApproverSCW__factory, FreeMoney__factory } from "../typechain-types";

const scwAddr = '0x426ebdfd85A021780563508D2E8e8705be9A21B6';
const freeMoneyAddr = '0xbF31a3b41FEDCa9d29C97c39Db862a23Cc09FbFC';

async function main() {
  const eoa = (await ethers.getSigners())[0];
  const wallet = ApproverSCW__factory.connect(scwAddr, eoa);
  const freeMoney = FreeMoney__factory.connect(freeMoneyAddr, eoa);

  const startTime = Date.now();

  console.log({ startTime });

  setInterval(async () => {
    console.log({
      timeSinceStart: Date.now() - startTime,
      eoa: ethers.utils.formatEther(await eoa.getBalance()),
      wallet: ethers.utils.formatEther(await ethers.provider.getBalance(wallet.address)),
      freeMoney: ethers.utils.formatEther(await ethers.provider.getBalance(freeMoney.address)),
    });
  }, 10000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
