const fs = require("fs").promises;

const part1 = instructions => {
    let EW = 0, NS = 0;
    const directions = [{dir: 'N', v: 1}, {dir: 'E', v: 1}, {dir: 'S', v: -1}, {dir: 'W', v: -1}]
    let currDir = 1;
    for (let i = 0; i < instructions.length; i++) {
        const action = instructions[i].substring(0, 1);
        const value = parseInt(instructions[i].substring(1), 10);

        if (action === 'F') {
            if (['E', 'W'].includes(directions[currDir].dir)) EW += directions[currDir].v * value;
            else NS += directions[currDir].v * value;
        } else if (['R', 'L'].includes(action)) {
            currDir += action === 'R' ? (value / 90) : -(value / 90);
            currDir = (currDir % directions.length + directions.length) % directions.length;
        } else {
            if (action === 'E') EW += value;
            if (action === 'W') EW -= value;
            if (action === 'N') NS += value;
            if (action === 'S') NS -= value;
        }
    }
    return {EW, NS};
};

const part2 = instructions => {
    let EW = 0, NS = 0;
    let waypoint = [10, 1];
    for (let i = 0; i < instructions.length; i++) {
        const action = instructions[i].substring(0, 1);
        const value = parseInt(instructions[i].substring(1), 10);

        if (action === 'F') {
            EW += waypoint[0] * value;
            NS += waypoint[1] * value;
        } else if (['R', 'L'].includes(action)) {
            for (let r = 0; r < (value / 90); r++) {
                if (action === 'R') {
                    waypoint = [waypoint[1], waypoint[0] * -1]
                } else {
                    waypoint = [waypoint[1] * -1, waypoint[0]]
                }
            }
        } else {
            if (action === 'E') waypoint[0] += value;
            if (action === 'W') waypoint[0] -= value;
            if (action === 'N') waypoint[1] += value;
            if (action === 'S') waypoint[1] -= value;
        }
    }

    return {EW, NS};
}

(async () => {
    const file = await fs.readFile("input-day12.txt");
    const instructions = file.toString().split("\n").filter(line => line);
    let {EW, NS} = part1(instructions);
    console.log('part 1', EW, NS, Math.abs(EW) + Math.abs(NS))

    let {EW: goodEW, NS: goodNS} = part2(instructions);
    console.log('part 2', goodEW, goodNS, Math.abs(goodEW) + Math.abs(goodNS))
})();
