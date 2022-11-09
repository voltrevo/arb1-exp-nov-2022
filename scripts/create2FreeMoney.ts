import { ethers } from "hardhat";

const safeSingletonFactoryAddr = '0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7';

async function main() {
  const factoryCode = await ethers.provider.getCode(safeSingletonFactoryAddr);

  if (factoryCode === '0x') {
    console.error('safeSingletonFactory has not been deployed');
    process.exit(1);
  }

  const FreeMoney = await ethers.getContractFactory("FreeMoney");

  const addr = ethers.utils.getCreate2Address(
    safeSingletonFactoryAddr,
    ethers.constants.HashZero,
    ethers.utils.keccak256(FreeMoney.bytecode),
  );

  console.log('Expected address:', addr);

  const existingCode = await ethers.provider.getCode(addr);

  if (existingCode !== '0x') {
    console.log('Already deployed:', addr);
    return;
  }

  const [eoa] = await ethers.getSigners();

  console.log('Deploying FreeMoney');

  const deployTx = {
    to: safeSingletonFactoryAddr,
    data: ethers.utils.solidityPack(['uint256', 'bytes'], [0, FreeMoney.bytecode]),
  };

  try {
    await (await eoa.sendTransaction(deployTx)).wait();
  } catch (error) {
    if ((error as any).code !== 'INSUFFICIENT_FUNDS') {
      throw error;
    }

    const gasEstimate = await eoa.estimateGas(deployTx);
    const gasPrice = await ethers.provider.getGasPrice();

    const balance = await eoa.getBalance();

    console.error(
      'Insufficient funds:',
      ethers.utils.formatEther(balance),
      'ETH, need (approx):',
      ethers.utils.formatEther(gasEstimate.mul(gasPrice)),
      'ETH',
    );

    process.exit(1);
  }

  const deployedCode = await ethers.provider.getCode(addr);

  if (deployedCode === '0x') {
    throw new Error('Failed');
  }

  console.log('Deployed:', addr);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
