import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const fs = require("fs");
  const { writeFile } = fs;
  let fname = `./chatFiles/chat.json`;
  let readData = [];
  const { method } = req;

  switch (method) {
    case "POST":
      const session = await getSession({ req });
      if (!session) {
        return res.status(400).json({ msg: "Invalid Authentication!" });
      }
      const text = req.body.text;
      const user = session.user.name;
      const userImg = session.user.image;
      const created_on = new Date();
      const updated_on = created_on;
      fs.readFile(fname, "utf8", (error, data) => {
        if (error) {
          const newMsg = {
            _id: "1",
            text: text,
            user: user,
            userImg: userImg,
            created_on: created_on,
            updated_on: updated_on,
          };
          const newArr = [newMsg];
          writeFile(fname, JSON.stringify(newArr, null, 2), (errorWr) => {
            if (errorWr) {
              return;
            }
          });
          return;
        }
        readData = JSON.parse(data);
        const id =
          readData.length > 0
            ? String(Math.max(...readData.map((i) => Number(i._id))) + 1)
            : "1";
        const response = {
          _id: String(id),
          text: text,
          user: user,
          userImg: userImg,
          created_on: created_on,
          updated_on: updated_on,
        };
        readData = [...readData, response];
        writeFile(fname, JSON.stringify(readData, null, 2), (error) => {
          if (error) {
            // console.log("An error has occurred ", error);
            return;
          }
          //console.log("Data written successfully to disk");
        });
      });
      res.status(200).json({ text: text, received: "OK" });
      break;
    case "GET":
      fs.readFile(fname, "utf8", (error, data) => {
        if (error) {
          res.status(404).json({ error: "no chat data" });
        } else {
          readData = JSON.parse(data);
          res.status(200).json({ readData });
        }
      });

      break;
    default:
      res.status(400).json({ msg: "Invalid request!" });

      break;
  }
}
