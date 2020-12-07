const fs = require("fs").promises;

const containsBag = (bags, lookup, key, ourBag) => {
    let contains = false;

    for (const {key: k} of bags[key]) {
        if (k === ourBag || lookup[k]) {
            contains = true;
        } else if (lookup[k] === undefined) {
            contains |= containsBag(bags, lookup, k, ourBag);
        }
    }

    lookup[key] = contains;
    return contains;
};

const getNumberOfBagsInside = (bags, key) => {
    let sum = 0;
    for (const {key: k, num} of bags[key]) {
        sum += num + num * getNumberOfBagsInside(bags, k);
    }

    return sum;
};

(async () => {
    const file = await fs.readFile("input-day7.txt");
    const rules = file.toString().split("\n");
    const bags = rules
        .filter((rule) => rule)
        .reduce((all, rule) => {
            const bags = rule.match(/([0-9]+) (\w+) (\w+) (bag)/g);
            all[rule.split(" ").slice(0, 2).join(" ")] = bags
                ? bags.map((bag) => ({
                    num: parseInt(bag), // will ignore everything after the first non-numeric character, what a hack...
                    key: bag.split(" ").slice(1, 3).join(" "),
                }))
                : [];
            return all;
        }, {});

    const canContainShinyGold = Object.keys(bags).filter((k) =>
        containsBag(bags, {}, k, "shiny gold")
    );
    console.log(canContainShinyGold.length); //126

    const bagsInsideShinyGold = getNumberOfBagsInside(bags, "shiny gold");
    console.log(bagsInsideShinyGold); //220149
})();
