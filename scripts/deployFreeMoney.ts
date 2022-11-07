import { ethers } from "hardhat";

async function main() {
  console.log('Deploying FreeMoney');

  const FreeMoney = await ethers.getContractFactory("FreeMoney");

  const freeMoney = await FreeMoney.deploy({
    value: ethers.utils.parseEther('0.0001'),
  });

  console.log('Got pending contract (unconfirmed tx?)', freeMoney.address);

  await freeMoney.deployed();

  console.log(`FreeMoney deployed to ${freeMoney.address}`);

  console.log({
    balance: ethers.utils.formatEther(
      await ethers.provider.getBalance(freeMoney.address),
    ),
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
