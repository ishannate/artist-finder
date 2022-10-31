import type { FC, PropsWithChildren } from "react";
import styles from "./Layout.module.css";
import background from "../../assets/images/music-bg.jpeg";
import { Header } from "../../components/Header/Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={`w-full ${styles.wrapper} vh-100`}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <Header />
      <div className={`container ${styles.content}`}>{children}</div>
    </div>
  );
};

export { Layout };
