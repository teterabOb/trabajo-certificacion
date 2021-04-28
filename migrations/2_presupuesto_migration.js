const Presupuesto = artifacts.require("Presupuesto");

module.exports = function (deployer) {
  deployer.deploy(Presupuesto);
};
