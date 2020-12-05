const fs = require("fs").promises;

(async () => {
  const file = await fs.readFile("input");
  const arr = file.toString().split("\n");

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (parseInt(arr[i]) + parseInt(arr[j]) === 2020) {
        console.log(arr[i] * arr[j]);
      }
    }
  }
})();
