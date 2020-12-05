const fs = require("fs").promises;

(async () => {
  const file = await fs.readFile("input");
  const arr = file.toString().split("\n");

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      for (let k = j; k < arr.length; k++) {
        if (parseInt(arr[i]) + parseInt(arr[j]) + parseInt(arr[k]) === 2020) {
          console.log(arr[i] * arr[j] * arr[k]);
        }
      }
    }
  }
})();
