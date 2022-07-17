import styles from "./footer.module.css";
import { FaEnvelope, FaGithubSquare } from "react-icons/fa";

import Image from "next/image";
export default function Footer() {
  return (
    <>
      <div className={styles.footerDiv}>
        <p className={styles.footerParagraph}>
          Designed and coded by Adelinked{" "}
          <a
            style={{ margin: "0 5px" }}
            href="https://nextjs.org"
            title="Developed using NextJs"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/NextJs.png" alt="nextJs logo" width={60} height={30} />
          </a>
          <a
            style={{ fontSize: "30px", color: "var(--color-font-light)" }}
            href="https://github.com/Adelinked"
            title="My Github"
            target="_blank"
          >
            <FaGithubSquare />
          </a>
          <a
            style={{
              fontSize: "30px",
              marginLeft: "5px",
              color: "var(--color-font-light)",
            }}
            href="mailto:adel.adelinked@gmail.com"
            title="Send me an email"
            target="_blank"
          >
            <FaEnvelope />
          </a>
        </p>
      </div>
    </>
  );
}
