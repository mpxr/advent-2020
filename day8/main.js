const fs = require("fs").promises;

function getAcc(instructions) {
  const alreadyExecuted = new Set();
  let acc = 0,
    line = 0;
  while (line !== instructions.length - 1 && !alreadyExecuted.has(line)) {
    alreadyExecuted.add(line);

    const [op, arg] = instructions[line];

    if (instructions[line][0] === "acc") {
      acc += arg;
    }

    if (op === "acc" || op === "nop") {
      line++;
    }

    if (op === "jmp") {
      line += arg;
    }
  }

  return [acc, line === instructions.length - 1];
}

(async () => {
  const file = await fs.readFile("input-day8.txt");
  const bootCode = file.toString().split("\n");
  const instructions = bootCode.map((i) => {
    let [op, arg] = i.split(" ");
    return [op, parseInt(arg)];
  });

  let [acc] = getAcc(instructions);
  console.log("part 1", acc);

  let line = 0;
  for (const [op] of instructions) {
    if (op === "jmp" || op === "nop") {
      let copy = JSON.parse(JSON.stringify(instructions));
      copy[line][0] = op === "jmp" ? "nop" : "jmp";
      const [acc, lastLine] = getAcc(copy);
      if (lastLine) {
        console.log("part 2", acc);
        break;
      }
    }
    line++;
  }
})();
