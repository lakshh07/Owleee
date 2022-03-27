// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const OwleeeLock = await hre.ethers.getContractFactory("OwleeeLock");
  const owleeeLock = await OwleeeLock.deploy();

  await owleeeLock.deployed();

  console.log("OwleeeLock deployed to:", owleeeLock.address);

  const OwleeeNFT = await hre.ethers.getContractFactory("OwleeeNFT");
  const owleeeNFT = await OwleeeNFT.deploy();

  await owleeeNFT.deployed();

  console.log("OwleeeNFT deployed to:", owleeeNFT.address);

  const OwleeeForum = await hre.ethers.getContractFactory("OwleeeForum");
  const owleeeForum = await OwleeeForum.deploy();

  await owleeeForum.deployed();

  console.log("OwleeeForum deployed to:", owleeeForum.address);

  const OwleeeTip = await hre.ethers.getContractFactory("OwleeeTip");
  const owleeeTip = await OwleeeTip.deploy();

  await owleeeTip.deployed();

  console.log("OwleeeTip deployed to:", owleeeTip.address);

  const contract_address = JSON.stringify({
    OwleeeLockAddress: owleeeLock.address,
    owleeeNFTAddress: owleeeNFT.address,
    OwleeeForumAddress: owleeeForum.address,
    OwleeeTipAddress: owleeeTip.address,
  });

  fs.writeFileSync(`${__dirname}/../contract_address.json`, contract_address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
