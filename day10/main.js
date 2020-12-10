const fs = require("fs").promises;

const getDiff = jolts => {
    let diff1 = 0, diff3 = 0;
    for (let i = 1; i < jolts.length; i++) {
        if (jolts[i] - jolts[i - 1] === 1) diff1++;
        else if (jolts[i] - jolts[i - 1] === 3) diff3++;
    }
    return diff1 * diff3;
}

const recurse = (currentIndex, jolts, memory) => {
    if (currentIndex === jolts.length - 1) return 1;

    if (memory[currentIndex]) return memory[currentIndex]

    let comb = 0;
    for (let i = currentIndex + 1; i < jolts.length; i++) {
        if (jolts[i] - jolts[currentIndex] <= 3) {
            comb += recurse(i, jolts, memory)
        }
    }

    memory[currentIndex] = comb;
    return comb;
}

(async () => {
    const file = await fs.readFile("input-day10.txt");
    const jolts = file.toString().split("\n")
        .filter(v => v)
        .map(line => parseInt(line))
        .sort((a, b) => a - b);

    jolts.unshift(0); // add the charging outlet that has an effective rating of 0
    jolts.push(jolts[jolts.length - 1] + 3); // add my device's built-in adapter

    console.log('part 1', getDiff(jolts))

    console.log('part 2', recurse(0, jolts, {}))
})();
