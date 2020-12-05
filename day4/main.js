const fs = require("fs").promises;

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const validateBYR = (byr) =>
  1920 <= parseInt(byr.substring(4)) && byr.substring(4) <= 2002;

const validateIYR = (iyr) =>
  2010 <= parseInt(iyr.substring(4)) && iyr.substring(4) <= 2020;

const validateEYR = (eyr) =>
  2020 <= parseInt(eyr.substring(4)) && eyr.substring(4) <= 2030;

const validateHGT = (hgt) => {
  const cm = hgt.substring(4).match(/(\d*)cm/);
  const inch = hgt.substring(4).match(/(\d*)in/);
  const valid =
    (cm && 150 <= cm[1] && cm[1] <= 193) ||
    (inch && 59 <= inch[1] && inch[1] <= 76) ||
    false;

  return valid;
};

const validateHCL = (hcl) => {
  return !!hcl.substring(4).match(/#[0-9a-f]{6}/);
};

const validateECL = (ecl) => {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
    ecl.substring(4)
  );
};

const validatePID = (pid) => {
  return !!pid.substring(4).match(/^[0-9]{9}$/);
};

(async () => {
  const file = await fs.readFile("input-day4.txt");
  const passports = file
    .toString()
    .split("\n\n")
    .map((fields) => fields.split(/[\s\n]/));

  const validPassports = passports.filter((fields) => {
    const fieldsInPassport = fields.map((f) => f.substring(0, 3));
    const haveAllRequiredFields = requiredFields.every((req) =>
      fieldsInPassport.includes(req)
    );
    //part 1
    // return haveAllRequiredFields;

    // part 2
    if (!haveAllRequiredFields) {
      return false;
    }

    const validBYR = validateBYR(fields.find((f) => f.startsWith("byr")));
    const validIYR = validateIYR(fields.find((f) => f.startsWith("iyr")));
    const validEYR = validateEYR(fields.find((f) => f.startsWith("eyr")));
    const validHGT = validateHGT(fields.find((f) => f.startsWith("hgt")));
    const validHCL = validateHCL(fields.find((f) => f.startsWith("hcl")));
    const validECL = validateECL(fields.find((f) => f.startsWith("ecl")));
    const validPID = validatePID(fields.find((f) => f.startsWith("pid")));
    return (
      validBYR &&
      validIYR &&
      validEYR &&
      validHGT &&
      validHCL &&
      validECL &&
      validPID
    );
  });

  console.log(passports.length, validPassports.length);
})();
