import { getData } from "../../lib/getData";

export default async function handler(req, res) {
  const { method } = req;
  const fname = `./chatFiles/chat.json`;
  switch (method) {
    case "GET":
      try {
        const readData = await getData(fname);
        res.status(200).json({ readData });
      } catch (e) {
        res.status(400).json({ success: false, error: e });
      }

      break;
    default:
      res.status(400).json({ msg: "Invalid request!" });
      break;
  }
}
