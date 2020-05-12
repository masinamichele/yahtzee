const c = require("chalk");

module.exports = class Scoreboard {
  aces___ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Aces",
  };
  twos___ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Twos",
  };
  threes_ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Threes",
  };
  fours__ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Fours",
  };
  fives__ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Fives",
  };
  sixes__ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Sixes",
  };
  toak___ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "3 of a kind",
  };
  foak___ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "4 of a kind",
  };
  full___ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Full house",
  };
  sstr___ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Small straight",
  };
  lstr___ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Large straight",
  };
  yathzee = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Yahtzee!",
  };
  chance_ = {
    value: 0,
    played: false,
    preview: false,
    selected: false,
    name: "Chance",
  };

  upperScores = [
    this.aces___,
    this.twos___,
    this.threes_,
    this.fours__,
    this.fives__,
    this.sixes__,
  ];

  lowerScores = [
    this.toak___,
    this.foak___,
    this.full___,
    this.sstr___,
    this.lstr___,
    this.yathzee,
    this.chance_,
  ];

  allPlayableScores = [
    this.aces___,
    this.twos___,
    this.threes_,
    this.fours__,
    this.fives__,
    this.sixes__,
    this.toak___,
    this.foak___,
    this.full___,
    this.sstr___,
    this.lstr___,
    this.yathzee,
    this.chance_,
  ];

  get playableScores() {
    return this.allPlayableScores.filter((score) => !score.played);
  }

  bonusYahtzees = 0;

  getScore(score) {
    const value = score.value;
    const color = (() => {
      if (score.played) return "red";
      if (score.selected) return "green";
      if (score.preview) return "yellow";
      return "white";
    })();
    return c[color](`${value}`).padStart(13, " ");
  }

  score(values) {
    return {
      on: (score) => {
        const _score = this.playableScores.find((x) => x.name == score);
        const value = (() => {
          const numberScoreIndex = [
            "__DO_NOT_REMOVE__",
            "Aces",
            "Twos",
            "Threes",
            "Fours",
            "Fives",
            "Sixes",
          ].findIndex((x) => x == score);
          if (numberScoreIndex > 0) {
            return (
              values.filter((x) => x == numberScoreIndex).length *
              numberScoreIndex
            );
          }

          const kindsScoreIndex = ["3 of a kind", "4 of a kind"].findIndex(
            (x) => x == score
          );
          if (kindsScoreIndex > -1) {
            if (
              Object.values(
                values.reduce((acc, val) => {
                  if (!acc[val]) acc[val] = 0;
                  acc[val]++;
                  return acc;
                }, {})
              ).some((x) => x >= kindsScoreIndex + 3)
            ) {
              return values.reduce((a, v) => a + v);
            }
          }

          switch (score) {
            case "Full house": {
              const stringQuantities = Object.values(
                values.reduce((acc, val) => {
                  if (!acc[val]) acc[val] = 0;
                  acc[val]++;
                  return acc;
                }, {})
              ).toString();
              if (stringQuantities == "2,3" || stringQuantities == "3,2") {
                return 25;
              }
            }
            case "Small straight": {
              const sorted = Array.from(new Set(values))
                .concat(Array.from({ length: 5 }).fill(values[0]))
                .slice(0, 5)
                .sort();
              const sub1 = sorted.slice(0, 4);
              const sub2 = sorted.slice(1, 5);
              if (
                sub1.every((x, i, arr) => (i ? x == arr[i - 1] + 1 : true)) ||
                sub2.every((x, i, arr) => (i ? x == arr[i - 1] + 1 : true))
              ) {
                return 30;
              }
            }
            case "Large straight": {
              if (
                values
                  .slice()
                  .sort()
                  .every((x, i, arr) => (i ? x == arr[i - 1] + 1 : true))
              ) {
                return 40;
              }
            }
            case "Yahtzee!": {
              if (values.every((x) => x == values[0])) {
                return 50;
              }
              break;
            }
            case "Chance": {
              return values.reduce((a, v) => a + v);
            }
          }
        })();

        const isYahtzeePlayed = this.yathzee.played && this.yathzee.value == 50;
        const isValuesYahtzee = values.every((x) => x == values[0]);
        const shouldIncrementTotal = isYahtzeePlayed && isValuesYahtzee;
        if (shouldIncrementTotal) {
          this.bonusYahtzees++;
        }

        _score.value = value || 0;
        _score.preview = false;
        _score.played = true;
      },
    };
  }

  preview(values) {
    for (const score of this.playableScores) {
      score.value = 0;
      score.preview = false;

      const isYahtzeePlayed = this.yathzee.played && this.yathzee.value == 50;
      const isValuesYahtzee = values.every((x) => x == values[0]);
      const isNumberYahtzeePlayed = this.upperScores[values[0] - 1].played;
      const JOKER = isYahtzeePlayed && isNumberYahtzeePlayed && isValuesYahtzee;

      const numberScoreIndex = [
        "__DO_NOT_REMOVE__",
        "Aces",
        "Twos",
        "Threes",
        "Fours",
        "Fives",
        "Sixes",
      ].findIndex((x) => x == score.name);
      if (numberScoreIndex > 0) {
        const value =
          values.filter((x) => x == numberScoreIndex).length * numberScoreIndex;
        if (value) {
          score.value = value;
          score.preview = true;
        }
        continue;
      }

      const kindsScoreIndex = ["3 of a kind", "4 of a kind"].findIndex(
        (x) => x == score.name
      );
      if (kindsScoreIndex > -1) {
        if (
          Object.values(
            values.reduce((acc, val) => {
              if (!acc[val]) acc[val] = 0;
              acc[val]++;
              return acc;
            }, {})
          ).some((x) => x >= kindsScoreIndex + 3) ||
          JOKER
        ) {
          const value = values.reduce((a, v) => a + v);
          if (value) {
            score.value = value;
            score.preview = true;
          }
        }
        continue;
      }

      switch (score.name) {
        case "Full house": {
          const stringQuantities = Object.values(
            values.reduce((acc, val) => {
              if (!acc[val]) acc[val] = 0;
              acc[val]++;
              return acc;
            }, {})
          ).toString();
          if (stringQuantities == "2,3" || stringQuantities == "3,2" || JOKER) {
            score.value = 25;
            score.preview = true;
          }
          break;
        }
        case "Small straight": {
          const sorted = Array.from(new Set(values))
            .concat(Array.from({ length: 5 }).fill(values[0]))
            .slice(0, 5)
            .sort();
          const sub1 = sorted.slice(0, 4);
          const sub2 = sorted.slice(1, 5);
          if (
            sub1.every((x, i, arr) => (i ? x == arr[i - 1] + 1 : true)) ||
            sub2.every((x, i, arr) => (i ? x == arr[i - 1] + 1 : true)) ||
            JOKER
          ) {
            score.value = 30;
            score.preview = true;
          }
          break;
        }
        case "Large straight": {
          if (
            values
              .slice()
              .sort()
              .every((x, i, arr) => (i ? x == arr[i - 1] + 1 : true)) ||
            JOKER
          ) {
            score.value = 40;
            score.preview = true;
          }
          break;
        }
        case "Yahtzee!": {
          if (isValuesYahtzee) {
            score.value = 50;
            score.preview = true;
          }
          break;
        }
        case "Chance": {
          score.value = values.reduce((a, v) => a + v);
          score.preview = true;
          break;
        }
      }
    }
  }

  getSubTotal(section) {
    const scores = (() => {
      switch (section) {
        case "upper":
          return this.upperScores;
        case "lower":
          return this.lowerScores;
      }
    })();

    const sum = scores
      .filter((x) => x.played)
      .map((x) => x.value)
      .reduce((acc, val) => acc + val, 0);
    return sum;
  }

  getBonus(section) {
    switch (section) {
      case "upper":
        if (this.getSubTotal("upper") >= 63) return 35;
        return 0;
      case "lower":
        if (this.bonusYahtzees > 0) return 100 * this.bonusYahtzees;
        return 0;
    }
  }

  padStart(str, n) {
    return `${str}`.padStart(n, " ");
  }

  getSectionTotal(section) {
    return this.getSubTotal(section) + this.getBonus(section);
  }

  getTotalScore() {
    return this.getSectionTotal("upper") + this.getSectionTotal("lower");
  }

  getPaceDiff() {
    const diff = this.upperScores
      .map((x, i) => {
        if (x.played) {
          const cmp = i + 1;
          const baseline = cmp * 3;
          if (x.value == baseline) return 0;
          return x.value - baseline;
        } else return 0;
      })
      .reduce((acc, val) => acc + val);

    if (diff > 0) return c.green(`+${diff}`.padStart(4, " "));
    if (diff < 0) return c.red(`${diff}`.padStart(4, " "));
    return `${diff}`.padStart(4, " ");
  }

  // prettier-ignore
  print() {
    console.log(c.grey(`╭${'─'.repeat(41)}╮`));
    console.log(`${c.grey('│')}${' '.repeat(18)}${c.bold.cyan('Score')}${' '.repeat(18)}${c.grey('│')}`);
    console.log(c.gray(`├${'─'.repeat(20)}┬${'─'.repeat(20)}┤`));
    console.log(`${c.grey('│')} Aces           ${this.getScore(this.aces___)} ${c.grey('│')} 3 of a kind    ${this.getScore(this.toak___)} ${c.grey('│')}`);
    console.log(`${c.grey('│')} Twos           ${this.getScore(this.twos___)} ${c.grey('│')} 4 of a kind    ${this.getScore(this.foak___)} ${c.grey('│')}`);
    console.log(`${c.grey('│')} Threes         ${this.getScore(this.threes_)} ${c.grey('│')} Full house     ${this.getScore(this.full___)} ${c.grey('│')}`);
    console.log(`${c.grey('│')} Fours          ${this.getScore(this.fours__)} ${c.grey('│')} Small straight ${this.getScore(this.sstr___)} ${c.grey('│')}`);
    console.log(`${c.grey('│')} Fives          ${this.getScore(this.fives__)} ${c.grey('│')} Large straight ${this.getScore(this.lstr___)} ${c.grey('│')}`);
    console.log(`${c.grey('│')} Sixes          ${this.getScore(this.sixes__)} ${c.grey('│')} Yahtzee!       ${this.getScore(this.yathzee)} ${c.grey('│')}`);
    console.log(`${c.grey('│')}                    ${c.grey('│')} Chance         ${this.getScore(this.chance_)} ${c.grey('│')}`);
    console.log(c.gray(`├${'─'.repeat(20)}┼${'─'.repeat(20)}┤`));
    console.log(`${c.grey('│')} +/-           ${this.getPaceDiff()} ${c.grey('│')}                    ${c.grey('│')}`);
    console.log(`${c.grey('│')} Total          ${this.padStart(this.getSubTotal('upper'), 3)} ${c.grey('│')} Total          ${this.padStart(this.getSubTotal('lower'), 3)} ${c.grey('│')}`);
    console.log(`${c.grey('│')} Bonus           ${this.padStart(this.getBonus('upper'), 2)} ${c.grey('│')} Bonus         ${this.padStart(this.getBonus('lower'), 4)} ${c.grey('│')}`);
    console.log(c.gray(`├${'─'.repeat(20)}┼${'─'.repeat(20)}┤`));
    console.log(`${c.grey('│')} Upper total    ${this.padStart(this.getSectionTotal('upper'), 3)} ${c.grey('│')} Lower total   ${this.padStart(this.getSectionTotal('lower'), 4)} ${c.grey('│')}`);
    console.log(c.gray(`├${'─'.repeat(20)}┴${'─'.repeat(20)}┤`));
    console.log(`${c.grey('│')} ${c.bold('Total score')}                        ${this.padStart(this.getTotalScore(), 4)} ${c.grey('│')}`);
    console.log(c.gray(`╰${'─'.repeat(41)}╯`));
  }
};
