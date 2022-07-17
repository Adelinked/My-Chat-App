import styles from "./user.module.css";
import { useSession } from "next-auth/react";
import { FaUser, FaUserPlus } from "react-icons/fa";

export const UserNav = ({ setShowLogin }) => {
  const { data: session } = useSession();
  let userName, userImg;
  if (session) {
    userName = session.user.name ?? session.user.email;
    userImg = session.user.image;
  }

  const openUserLogin = () => {
    setShowLogin(true);
  };
  return (
    <span
      className={styles.userIcon}
      onClick={openUserLogin}
      style={{ color: session ? `var(--color-font)` : undefined }}
    >
      {!session ? (
        <span className={styles.loginTxt}>Login</span>
      ) : (
        <>
          <span className={styles.logouTxt}>Logout</span>
        </>
      )}
      {!session ? (
        <FaUserPlus />
      ) : (
        <FaUser title={`Connected as ${userName}`} />
      )}
    </span>
  );
};
