import { BigNumberish } from "ethers";
import { keccak256 } from "ethers/lib/utils";
import { ApproverSCW__factory } from "./typechain-types";

type Action = {
  to: string;
  value: BigNumberish;
  data: string;
};

export function ActionsHash(actions: Action[]) {
  const fnData = ApproverSCW__factory.createInterface().encodeFunctionData(
    "perform",
    [actions],
  );

  const operationBytes = `0x${fnData.slice(10)}`;

  return keccak256(operationBytes);
}

export default Action;
