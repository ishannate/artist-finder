import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { SearchArtistApp } from "../SearchArtist/SearchArtistApp";
import styles from "./Header.module.css";

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`container ${styles.header} d-flex flex-column flex-md-row justify-content-between px-4`}
    >
      <div className="col-12 col-md-8 gap-4 d-flex justify-content-between justify-content-md-start align-items-center">
        <p onClick={() => navigate("/")} className={`${styles.title_button}`}>
          LABEL-<span className={styles.red_accent}>A</span>
        </p>
        <div>
          <Button
            transparent
            textColor="red"
            onClick={() => {
              navigate("/songs");
            }}
          >
            Songs
          </Button>
        </div>
      </div>
      <div className={`col-12 col-md-4 d-flex flex-column ${styles.container}`}>
        <div className={` ${styles.positioned} w-100`}>
          <SearchArtistApp />
        </div>
      </div>
    </div>
  );
};

export { Header };
