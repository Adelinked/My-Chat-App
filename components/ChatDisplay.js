import styles from "../styles/Home.module.scss";
import { useEffect } from "react";
import OneMsg from "./OneMsg";
const ChatDisplay = ({ messages }) => {
  useEffect(() => {
    const chatDisplay = document.getElementById("messages");
    chatDisplay.scroll({
      top: chatDisplay.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className={styles.displayDiv} id="messages">
      {messages.map((m) => (
        <OneMsg key={m._id} {...m} />
      ))}
    </div>
  );
};

export default ChatDisplay;
