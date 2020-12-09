const fs = require("fs").promises;

const getSums = (arr) => {
    const sums = new Set();
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length; j++) {
            sums.add(arr[i] + arr[j])
        }
    }
    return sums;
}

const getInvalidNumber = cypher => {
    let window = cypher.slice(0, 25)
    for (let i = 25; i < cypher.length; i++) {
        const sums = getSums(window)
        if (!sums.has(cypher[i])) {
            return cypher[i];
        }
        window = cypher.slice(i + 1 - 25, i + 1);
    }
};

(async () => {
    const file = await fs.readFile("input-day9.txt");
    const cypher = file.toString().split("\n").map(line => parseInt(line));
    const invalid = getInvalidNumber(cypher);
    console.log('part 1', invalid)


    for (let i = 0; i < cypher.length; i++) {
        let j = i + 1;
        let stop = false;
        let product = cypher[i];
        const range = [cypher[i]];
        while (!stop) {
            product += cypher[j];
            range.push(cypher[j]);

            if (product >= invalid) {
                stop = true;
            } else {
                j++;
            }
        }
        if (product === invalid) {
            let min = Math.max.apply(Math, range);
            let max = Math.min.apply(Math, range);
            console.log('part 2', min, max, min+max);
            break;
        }
    }
})();
