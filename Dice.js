const c = require("chalk");

module.exports = class Dice {
  value;
  selected = false;

  constructor(value) {
    this.value = value || 1;
  }

  roll() {
    this.value = Math.floor(Math.random() * 6 + 1);
  }

  pipIf(...numbers) {
    return numbers.includes(this.value) ? "●" : " ";
  }

  toggle() {
    this.selected = !this.selected;
  }

  // prettier-ignore
  printRaw(row, number) {
    switch (row) {
      case 1:
        process.stdout.write(`╭${'─'.repeat(7)}╮`);
        break;
      case 2:
        process.stdout.write(`│ ${this.pipIf(4,5,6)}   ${this.pipIf(2,3,4,5,6)} │`);
        break;
      case 3:
        process.stdout.write(`│ ${this.pipIf(6)} ${this.pipIf(1,3,5)} ${this.pipIf(6)} │`);
        break;
      case 4:
        process.stdout.write(`│ ${this.pipIf(2,3,4,5,6)}   ${this.pipIf(4,5,6)} │`);
        break;
      case 5:
        process.stdout.write(`╰${'─'.repeat(7)}╯`);
        break;
      case 6:
        process.stdout.write(` ${number}  ${this.selected ? c.greenBright('✔') : ' '}    `);
    }
  }
};
