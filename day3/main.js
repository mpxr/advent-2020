const fs = require("fs").promises;

const countTrees = (arr, r, d) => {
  let col = 0,
    sum = 0;
  for (let row = 0; row < arr.length; row += d) {
    if (arr[row][col] === "#") {
      sum++;
    }
    col += r;
    col %= arr[0].length;
  }
  return sum;
};

(async () => {
  const file = await fs.readFile("input-day3.txt");
  const map = file
    .toString()
    .split("\n")
    .map((line) => line.split(""));

  // part1
  console.log(countTrees(map, 3, 1));

  //part2
  const comb1 = countTrees(map, 1, 1);
  const comb2 = countTrees(map, 3, 1);
  const comb3 = countTrees(map, 5, 1);
  const comb4 = countTrees(map, 7, 1);
  const comb5 = countTrees(map, 1, 2);

  console.log(
    comb1,
    comb2,
    comb3,
    comb4,
    comb5,
    "=",
    comb1 * comb2 * comb3 * comb4 * comb5
  );
})();
