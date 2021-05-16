var Presupuesto = artifacts.require("./Presupuesto.sol");

module.exports = function(deployer) {
  deployer.deploy(Presupuesto);
};
