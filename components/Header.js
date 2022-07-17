import styles from "../styles/Home.module.scss";
import { useSession } from "next-auth/react";
import UserLogin from "./User/UserLogin";
import { UserNav } from "./User/UserNav";
import { useState } from "react";
import { IoIosPeople } from "react-icons/io";
export default function Header() {
  const { data: session } = useSession();
  const [showLogin, setShowLogin] = useState(false);
  let userName = "Anonymous",
    userImg;
  if (session) {
    userName = session.user.name ?? session.user.email;
    userImg = session.user.image;
  }

  return (
    <div className={styles.headerDiv}>
      <div className={styles.logoDiv}>
        My Chat app
        <IoIosPeople style={{ fontSize: "2rem" }} />
      </div>
      <div className={styles.userInfosDiv}>
        <div className={styles.userNameDiv}>
          <div title={`connected as ${userName}`}>{userName}</div>
          <div className={styles.avatarDiv}>
            <img
              className="avatar"
              src={userImg ?? "/anonymous.png"}
              alt={`${userName} photo`}
            ></img>
          </div>
        </div>
        <UserNav setShowLogin={setShowLogin} />
      </div>

      <UserLogin showLogin={showLogin} setShowLogin={setShowLogin} />
    </div>
  );
}
