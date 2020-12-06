const fs = require("fs").promises;

(async () => {
  const file = await fs.readFile("input-day6.txt");
  const groups = file.toString().split("\n\n");

  // part 1
  const sum = groups
    .map(
      (group) =>
        group.split("\n").reduce((allYesAnswers, answers) => {
          answers.split("").forEach((l) => allYesAnswers.add(l));
          return allYesAnswers;
        }, new Set()).size
    )
    .reduce((acc, curr) => acc + curr, 0);

  console.log("sum of the questions where anyone answered yes", sum);

  // part 2
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const sum2 = groups
    .map((group) => {
      const answerSets = group
        .split("\n")
        .filter((answers) => answers)
        .map((answers) => new Set(answers));
      return alphabet.filter((l) => answerSets.every((set) => set.has(l)))
        .length;
    })
    .reduce((acc, curr) => acc + curr, 0);

  console.log("sum of the questions where everyone answered yes", sum2);
})();
