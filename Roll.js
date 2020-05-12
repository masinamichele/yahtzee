const Dice = require("./Dice");

module.exports = class Roll {
  d1 = new Dice(1);
  d2 = new Dice(2);
  d3 = new Dice(3);
  d4 = new Dice(4);
  d5 = new Dice(5);

  dices = [this.d1, this.d2, this.d3, this.d4, this.d5];

  roll() {
    this.dices.forEach((dice) => {
      if (!dice.selected) {
        dice.roll();
      }
    });
  }

  deselect() {
    this.dices.forEach((dice) => {
      if (dice.selected) {
        dice.toggle();
      }
    });
  }

  getValue() {
    return this.dices.map((x) => x.value);
  }

  print() {
    for (let i = 1; i <= 6; i++) {
      this.dices.forEach((dice, num) => {
        dice.printRaw(i, num + 1);
        process.stdout.write("  ");
      });
      process.stdout.write("\n");
    }
  }
};
