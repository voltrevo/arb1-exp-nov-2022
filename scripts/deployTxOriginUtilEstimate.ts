import { ethers } from "hardhat";

// import {} from "../typechain-types/contracts/TxOriginUtil";

async function main() {
  const TxOriginUtil = await ethers.getContractFactory("TxOriginUtil");

  const [estimatedGas, gasPrice] = await Promise.all([
    ethers.provider.estimateGas({
      data: TxOriginUtil.interface.encodeDeploy(),
    }),
    ethers.provider.getGasPrice(),
  ]);

  console.log({
    estimatedGas,
    gasPrice,
    fee: `${ethers.utils.formatEther(estimatedGas.mul(gasPrice))} ETH`,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
