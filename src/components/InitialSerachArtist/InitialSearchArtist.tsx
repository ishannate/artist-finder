import type { FC } from "react";
import { useState } from "react";
import { SearchArtistApp } from "../SearchArtist/SearchArtistApp";
import TagLabel from "../Tag/TagLabel";
import styles from "./InitialSearchArtist.module.css";

const InitialSearchArtist: FC = () => {
  const [searchedArtistName, setSearchedArtistName] = useState("");

  return (
    <div className={`${styles.container} shadow`}>
      <p className={`mb-4 ${styles.header}`}>Search your favourite artist</p>
      <SearchArtistApp searchedArtistName={searchedArtistName} />
      <div className="d-flex flex-column align-items-center">
        <div className="col-12 col-md-6 my-5 d-flex flex-wrap justify-content-center gap-4">
          <TagLabel
            textColor="#00a6ff"
            onClick={() => {
              setSearchedArtistName("Eminem");
            }}
          >
            Eminem
          </TagLabel>
          <TagLabel
            textColor="#00a6ff"
            onClick={() => {
              setSearchedArtistName("Marc Anthony");
            }}
          >
            Marc Anthony
          </TagLabel>
          <TagLabel
            textColor="#00a6ff"
            onClick={() => {
              setSearchedArtistName("Madonna");
            }}
          >
            Madonna
          </TagLabel>
          <TagLabel
            textColor="#00a6ff"
            onClick={() => {
              setSearchedArtistName("Maroon 5");
            }}
          >
            Maroon 5
          </TagLabel>
        </div>
        <div className="col-12 col-md-4 mb-5">
          <p className={styles.description}>
            We bring together your favourite music services and join up
            listening, watching and sharing to connect your musical world.
            Search your favourite artsits from Last FM and get all the album
            details and tracks for each album.
          </p>
          <p className={styles.description}>
            your favourite tracks to your personalized favorites list and listen
            to them in last FM
          </p>
        </div>
      </div>
    </div>
  );
};

export { InitialSearchArtist };
