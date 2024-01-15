const { expect } = require('chai')
const { ethers } = require('hardhat')
const { utils } = ethers

describe("Transfer Contract", function () {
  let Transfer;
  let transfer;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    Transfer = await ethers.getContractFactory("Transfer");
    transfer = await Transfer.deploy();
     await Transfer.deploy();
  });

  it("Should send ETH to multiple addresses", async function () {
    await owner.sendTransaction({ to: transfer.address, value: ethers.parseEther("10") });

    const initialBalance1 = await addr1.getBalance();
    const initialBalance2 = await addr2.getBalance();

    await transfer.sendEth([addr1.address, addr2.address], [ethers.parseEther("3"), ethers.parseEther("5")]);

    const finalBalance1 = await addr1.getBalance();
    const finalBalance2 = await addr2.getBalance();

    expect(finalBalance1.sub(initialBalance1)).to.equal(ethers.parseEther("3"));
    expect(finalBalance2.sub(initialBalance2)).to.equal(ethers.parseEther("5"));
  });
});
