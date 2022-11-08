import { ethers } from "hardhat";
import { ActionsHash } from "../Action";
import { ApproverSCW__factory, FreeMoney__factory, TxOriginUtil__factory } from "../typechain-types";

const scwAddr = '0x426ebdfd85A021780563508D2E8e8705be9A21B6';
const txOriginUtilAddr = '0x5c19B58e84Eedfd684002e0900f2418641850517';
const freeMoneyAddr = '0xbF31a3b41FEDCa9d29C97c39Db862a23Cc09FbFC';

async function main() {
  const eoa = (await ethers.getSigners())[0];
  const wallet = ApproverSCW__factory.connect(scwAddr, eoa);
  const txOriginUtil = TxOriginUtil__factory.connect(txOriginUtilAddr, ethers.provider);
  const freeMoney = FreeMoney__factory.connect(freeMoneyAddr, eoa);

  const balanceBefore = await eoa.getBalance();

  console.log({
    balanceBefore: ethers.utils.formatEther(balanceBefore),
  });

  // const actions = [
  //   {
  //     to: txOriginUtil.address,
  //     value: ethers.utils.parseEther("0.0001"),
  //     data: txOriginUtil.interface.encodeFunctionData("sendEthToTxOrigin"),
  //   },
  // ];

  const ack = await (freeMoney.collect({
    // maxFeePerGas: 50000000,
    // maxPriorityFeePerGas: 0,
  }).catch((e: Error) => e));

  if (ack instanceof Error) {
    console.log({ ack });
    return;
  }

  await ack.wait();

  // console.log({ ack });

  // const ackTime = Date.now();
  // console.log({ ackTime });
  
  // const intervalId = setInterval(async () => {
  //   const balance = ethers.utils.formatEther(await ethers.provider.getBalance(wallet.address));

  //   console.log({
  //     timeSinceAck: Date.now() - ackTime,
  //     balance,
  //   });

  //   if (balance !== '0.001') {
  //     clearInterval(intervalId);
  //   }
  // }, 5000);

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

  // await (await wallet.approve(ActionsHash([
  //   {
  //     to: eoa.address,
  //     value: ethers.utils.parseEther("0.001"),
  //     data: "0x",
  //   },
  // ]))).wait();

  // await (await wallet.perform([
  //   {
  //     to: eoa.address,
  //     value: ethers.utils.parseEther("0.001"),
  //     data: "0x",
  //   },
  // ])).wait();
