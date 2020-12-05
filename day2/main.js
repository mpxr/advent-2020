const fs = require("fs").promises;

(async () => {
  const file = await fs.readFile("input-day2");
  const arr = file.toString().split("\n");

  let counter = 0;

  for (const line of arr) {
    if (line.length) {
      const [_, from, to, letter, password] = line.match(
        /(\d+)-(\d+) (\S): (\S*)/
      );

      // part2
      const wordArray = password.split("");
      if (
        (wordArray[from - 1] === letter || wordArray[to - 1] === letter) &&
        !(wordArray[from - 1] === letter && wordArray[to - 1] === letter)
      ) {
        console.log(letter, from, to, password);
        counter++;
      }
    }
  }

  console.log(counter);
})();
