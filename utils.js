const c = require("chalk");

const printLogo = () => {
  console.log(`
██╗   ██╗ █████╗ ██╗  ██╗████████╗███████╗███████╗███████╗██╗
╚██╗ ██╔╝██╔══██╗██║  ██║╚══██╔══╝╚════██║██╔════╝██╔════╝██║
 ╚████╔╝ ███████║███████║   ██║     ███╔═╝█████╗  █████╗  ██║
  ╚██╔╝  ██╔══██║██╔══██║   ██║   ██╔══╝  ██╔══╝  ██╔══╝  ╚═╝
   ██║   ██║  ██║██║  ██║   ██║   ███████╗███████╗███████╗██╗
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝╚══════╝╚═╝
  `);
  console.log(" Developed by Masina Michele - 2020");
  console.log(c.gray(" https://en.wikipedia.org/wiki/Yahtzee"));
  console.log();
};

const clear = () => {
  console.clear();
  printLogo();
};

module.exports = {
  printLogo,
  clear,
};
