import { useState, useEffect, useRef, memo } from "react";
import axios from "axios";
import styles from "./Messages.module.scss";

const ChatInput = () => {
  const inputRef = useRef();
  const [text, setText] = useState("");
  const [disableSendBut, setDisableSendBut] = useState(false);

  const sendText = async () => {
    try {
      //const resBe = await axios.post("/api", { text: text });
      const res = await axios.post("/api/chat", { text: text });
    } catch (e) {}
  };
  const handleClick = () => {
    setDisableSendBut(true);
    //  if (session) {
    if (text.length > 0) {
      sendText();
    } else {
      setText("Message couldn't be empty!");
    }
    /* } else {
      setText("Only logged users can send messages!");
    }*/

    setTimeout(() => {
      setText("");
      setDisableSendBut(false);
    }, 800);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  /*useEffect(() => {
    inputRef.current.focus();
  }, []);*/
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      /*Enter key code*/ handleClick();
    }
  };
  return (
    <div className={styles.chatInputDiv}>
      <input
        className={styles.chatInput}
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
        ref={inputRef}
      />
      <button
        className={styles.chatInputBut}
        onClick={handleClick}
        disabled={disableSendBut}
      >
        Send
      </button>
    </div>
  );
};

export default memo(ChatInput);
