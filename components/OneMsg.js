import styles from "./Messages.module.scss";
import { displayDate } from "../lib/displayDate";
const OneMsg = ({ _id, text, user, userImg, updated_on }) => {
  const imgAlt = user.length > 5 ? user.slice(0, 5) : user;
  return (
    <div className={styles.msgDiv}>
      <span className={styles.msgDate}>{displayDate(updated_on)}</span>
      <div title={user} className={styles.msgTxtImg}>
        <img
          className="avatar"
          src={userImg ?? "/anonymous.png"}
          alt={`${imgAlt}`}
        ></img>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default OneMsg;
