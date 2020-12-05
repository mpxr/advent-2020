const fs = require("fs").promises;

const rowRange = [...Array(128).keys()];
const colRange = [...Array(8).keys()];

const binarySearch = (arr, partitions, lower, upper) => {
  let start = 0,
    end = arr.length - 1,
    iter = 0;
  while (iter < partitions.length) {
    const middle = Math.floor((start + end) / 2);
    if (partitions[iter] === lower) end = middle - 1;
    if (partitions[iter] === upper) start = middle + 1;
    iter++;
  }
  return start;
};

const getSeat = (pass) => {
  const rowPartitions = pass.substring(0, 7).split("");
  const colPartitions = pass.substring(7, 10).split("");
  const row = binarySearch(rowRange, rowPartitions, "F", "B");
  const column = binarySearch(colRange, colPartitions, "L", "R");
  return [row, column];
};

(async () => {
  const file = await fs.readFile("input-day5.txt");
  const passes = file.toString().split("\n");
  const seats = passes.filter((pass) => pass).map((pass) => getSeat(pass));
  const seatIds = seats.map(([row, column]) => row * 8 + column);
  // part 1
  const highestId = Math.max(...seatIds);
  console.log("highestId", highestId);

  //   part 2
  const seatSet = new Set([...seatIds]);
  let myId = 0;
  while (
    !(seatSet.has(myId - 1) && seatSet.has(myId + 1) && !seatSet.has(myId))
  ) {
    myId++;
  }
  console.log("myId", myId);
})();
