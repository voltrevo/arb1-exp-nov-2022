import { ethers } from "hardhat";

const safeSingletonDeployment = {
	gasPrice: 100000000000,
	gasLimit: 100000,
	signerAddress: "0xE1CB04A0fA36DdD16a06ea828007E35e1a3cBC37",
	transaction: [
    '0x',
    'f8a78085174876e800830186a08080b853604580600e600039806000f350fe7ffffffffff',
    'fffffffffffffffffffffffffffffffffffffffffffffffffffffe0360160008160208237',
    '8035828234f58015156039578182fd5b8082525050506014600cf382f4f5a00dc4d1d21b3',
    '08094a30f5f93da35e4d72e99115378f135f2295bea47301a3165a0636b822daad40aa8c5',
    '2dd5132f378c0c0e6d83b4898228c7e21c84e631a0b891',
  ].join(''),
	address: "0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7"
};

async function main() {
  const existingCode = await ethers.provider.getCode(
    safeSingletonDeployment.address,
  );

  if (existingCode !== '0x') {
    console.log('Already deployed:', safeSingletonDeployment.address);
    return;
  }

  const [eoa] = await ethers.getSigners();

  console.log('Funding signerAddress');

  await (await eoa.sendTransaction({
    to: safeSingletonDeployment.signerAddress,
    value: ethers.BigNumber.from(safeSingletonDeployment.gasPrice)
      .mul(safeSingletonDeployment.gasLimit),
  })).wait();

  console.log('Deploying');

  await (await ethers.provider.sendTransaction(
    safeSingletonDeployment.transaction,
  )).wait();

  const deployedCode = await ethers.provider.getCode(
    safeSingletonDeployment.address,
  );

  if (deployedCode === '0x') {
    throw new Error('Failed');
  }

  console.log('Deployed:', safeSingletonDeployment.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
