const c = require("chalk");
const prompts = require("prompts");

const utils = require("./utils");
const Scoreboard = require("./Scoreboard");
const Roll = require("./Roll");

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
  if (key.ctrl && key.name == "x") {
    process.exit();
  }
});

~(async () => {
  let GAME_STATE = "NEW";

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
          type: "number",
          name: "diceKeep",
          message: `Press ${c.cyan("1-5")} to keep dices. Leave empty to ${
            currentRoll == 3 ? "Confirm" : "Roll"
          }.`,
          min: 1,
          max: 6,
        },
      ]);

      if (diceKeep) {
        roll[`d${diceKeep}`].toggle();
        redraw(currentRoll, false);
      } else {
        if (currentRoll <= 2) {
          currentRoll++;
          redraw(currentRoll);
          if (currentRoll == 3) break;
        } else break;
      }
    }

    roll.deselect();
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

    score.score(roll.getValue()).on(scoreSel);
    currentRound++;
  }

  redraw(null, false);

  console.log(`Game over. Score: ${score.getTotalScore()}\n`);
})();
