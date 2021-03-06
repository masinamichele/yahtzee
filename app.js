const c = require("chalk");
const prompts = require("prompts");

const utils = require("./utils");
const Scoreboard = require("./Scoreboard");
const Roll = require("./Roll");

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.appendFile);
const path = require("path");
const logfile = path.resolve(path.dirname("") + "/yahtzee.log");

function quit() {
  console.log("\n");
  console.log("Bye!");
  process.exit();
}

process.stdin.on("keypress", (str, key) => {
  if (key.ctrl && key.name == "x") {
    quit();
  }
});

~(async () => {
  while (true) {
    utils.clear();

    const score = new Scoreboard();
    score.print();

    const roll = new Roll();

    console.log();
    await prompts([
      {
        type: "invisible",
        message: `Press ${c.cyan("Enter")} to start a new game.`,
      },
    ]);

    let currentRound = 1;

    const redraw = (currentRoll, reroll = true) => {
      utils.clear();
      if (reroll) roll.roll();
      score.preview(roll.getValue());
      score.print();
      console.log();
      if (!currentRoll) return;
      process.stdout.write(
        ` Roll ${c.bold[[null, "green", "yellow", "red"][currentRoll]](
          currentRoll
        )}/3`
      );
      process.stdout.write(" ".repeat(32));
      process.stdout.write(c.grey(`[${roll.getValue()}]`));
      console.log();
      roll.print();
      console.log();
    };

    while (currentRound <= 13) {
      let currentRoll = 1;
      redraw(currentRoll);

      while (true) {
        const { diceKeep } = await prompts([
          {
            type: "text",
            name: "diceKeep",
            // prettier-ignore
            message: `Input any combination of ${c.cyan("1-5")} to keep dices.\n`,
            initial: "Anything else to reroll\n",
            format: (value) => {
              return Array.from(
                new Set(
                  value
                    .split("")
                    .map(Number)
                    .filter(Boolean)
                    .filter((x) => x >= 1 && x <= 5)
                )
              );
            },
          },
        ]);

        if (diceKeep && diceKeep.length) {
          for (const num of diceKeep) {
            roll[`d${num}`].toggle();
          }
          redraw(currentRoll, false);
        } else {
          if (currentRoll <= 2) {
            currentRoll++;
            redraw(currentRoll);
            if (currentRoll == 3) break;
          } else break;
        }
      }

      redraw(currentRoll, false);

      const { scoreSel } = await prompts([
        {
          type: "select",
          name: "scoreSel",
          message: `Select a score`,
          choices: score.playableScores.map((s) => ({
            title: s.name,
            value: s.name,
          })),
        },
      ]);

      roll.deselect();
      score.score(roll.getValue()).on(scoreSel);
      currentRound++;
    }

    redraw(null, false);

    console.log(` Game over. Score: ${score.getTotalScore()}\n`);

    await writeFile(
      logfile,
      `${new Date().toISOString()} - ${score.getTotalScore()}\n`
    );

    const { newGame } = await prompts([
      {
        type: "toggle",
        name: "newGame",
        message: "Play again?",
        initial: true,
        active: "Yes",
        inactive: "No",
      },
    ]);

    if (!newGame) quit();
  }
})();
