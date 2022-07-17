export async function getData(fname) {
  const fs = require("fs/promises");
  try {
    const data = await fs.readFile(fname, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}
