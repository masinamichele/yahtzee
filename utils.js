const c = require("chalk");
const pjson = require("./package.json");

const printLogo = () => {
  console.log(`
██╗   ██╗ █████╗ ██╗  ██╗████████╗███████╗███████╗███████╗██╗
╚██╗ ██╔╝██╔══██╗██║  ██║╚══██╔══╝╚════██║██╔════╝██╔════╝██║
 ╚████╔╝ ███████║███████║   ██║     ███╔═╝█████╗  █████╗  ██║
  ╚██╔╝  ██╔══██║██╔══██║   ██║   ██╔══╝  ██╔══╝  ██╔══╝  ╚═╝
   ██║   ██║  ██║██║  ██║   ██║   ███████╗███████╗███████╗██╗
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝╚══════╝╚═╝
  `);
  console.log(
    ` Developed by Masina Michele - 2020                   v.${pjson.version}`
  );
  console.log(
    c.gray(" https://en.wikipedia.org/wiki/Yahtzee") + "       Press ^X to quit"
  );
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
