const fs = require("fs").promises;

const get = (arr, i, j) => {
    if (arr[i] === undefined) return 'L'
    if (arr[i][j] === undefined) return 'L'
    return arr[i][j];
}

const stanUp = seats => {
    const newArrangement = JSON.parse(JSON.stringify(seats))
    let numberOfOccupiedSeats = 0
    for (let row = 0; row < seats.length; row++) {
        for (let col = 0; col < seats[0].length; col++) {
            const numOfOccupiedNeighbour = [
                get(seats, row - 1, col - 1) === '#',
                get(seats, row - 1, col) === '#',
                get(seats, row - 1, col + 1) === '#',
                get(seats, row, col - 1) === '#',
                get(seats, row, col + 1) === '#',
                get(seats, row + 1, col - 1) === '#',
                get(seats, row + 1, col) === '#',
                get(seats, row + 1, col + 1) === '#'].filter(v => v).length

            if (get(seats, row, col) === 'L' && numOfOccupiedNeighbour === 0) {
                newArrangement[row][col] = '#'
            }
            else if (get(seats, row, col) === '#' && numOfOccupiedNeighbour >= 4) {
                newArrangement[row][col] = 'L'
            }

            if (seats[row][col] === '#') numberOfOccupiedSeats++;
        }
    }

    return [newArrangement, numberOfOccupiedSeats];
};

(async () => {
    const file = await fs.readFile("input-day11.txt");
    const seats = file.toString().split("\n").filter(line => line).map(line => line.split(''));

    let [arrangement, numberOfOccupiedSeats] = stanUp(seats)

    let changed = false;
    while (!changed) {
        const [newArrangement, newOccupiedSeats] = stanUp(arrangement)
        changed = numberOfOccupiedSeats === newOccupiedSeats;
        arrangement = newArrangement;
        numberOfOccupiedSeats = newOccupiedSeats;
        console.log(numberOfOccupiedSeats)
    }
})();
