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
    ` Developed by Masina Michele - 05/2020               v.${pjson.version}`
  );
  console.log(
    c.gray(" https://en.wikipedia.org/wiki/Yahtzee") +
      `              Quit: ${c.inverse("^X")}`
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
