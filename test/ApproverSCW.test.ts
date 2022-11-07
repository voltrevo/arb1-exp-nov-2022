import { expect } from "chai";
import { ethers } from "hardhat";
import { ActionsHash } from "../Action";

describe("ApproverSCW", function () {
  async function Fixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ApproverSCW = await ethers.getContractFactory("ApproverSCW");
    const wallet = await ApproverSCW.deploy();

    return { wallet, owner, otherAccount };
  }

  it("happy path", async () => {
    const { wallet, owner, otherAccount } = await Fixture();

    await (await owner.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("1.0"),
    })).wait();

    const actions = [
      {
        to: otherAccount.address,
        value: ethers.utils.parseEther("1.0"),
        data: "0x",
      }
    ];

    await (await wallet.approve(ActionsHash(actions))).wait();

    await (await wallet.connect(otherAccount).perform(actions)).wait()

    const otherBalance = await otherAccount.getBalance();

    const otherBalanceRoundedEth = Math.round(
      Number(ethers.utils.formatEther(otherBalance)),
    );

    expect(otherBalanceRoundedEth).to.eq(10001);
  });
});
