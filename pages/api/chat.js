import { getSession } from "next-auth/react";

export default async function (req, res) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    // get message
    const message = req.body;
    const user = session?.user?.name ?? "anonymous";
    const userImg = session?.user?.image;
    const created_on = new Date();
    const updated_on = created_on;
    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", {
      ...message,
      user: user,
      userImg: userImg,
      created_on: created_on,
      updated_on: updated_on,
    });

    const fs = require("fs");
    const { writeFile } = fs;
    let fname = `./chatFiles/chat.json`;
    let readData = [];

    fs.readFile(fname, "utf8", (error, data) => {
      if (error) {
        const newMsg = {
          _id: "1",
          ...message,
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
        ...message,
        user: user,
        userImg: userImg,
        created_on: created_on,
        updated_on: updated_on,
      };
      readData = [...readData, response];
      writeFile(fname, JSON.stringify(readData, null, 2), (error) => {
        if (error) {
          return;
        }
      });
    });
    // return message
    res.status(201).json(message);
  }
}
