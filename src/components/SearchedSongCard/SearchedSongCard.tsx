import {
  faHeadphones,
  faHeart,
  faMicrophone,
  faRecordVinyl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useState } from "react";
import { numberWithCommas } from "../../helpers/helpers";
import styles from "./SearchedSongCard.module.css";

interface SearchedSongCardProps {
  name: string;
  artist: string;
  listeners: string;
  onSelectFav: (isTrackInFavList: boolean) => void;
}

const SearchedSongCard: FC<SearchedSongCardProps> = ({
  artist,
  name,
  listeners,
  onSelectFav,
}) => {
  const [isTrackInFavList, setIsTrackInFavList] = useState(false);

  const onFavSelect = () => {
    onSelectFav(isTrackInFavList);
    setIsTrackInFavList(!isTrackInFavList);
  };

  return (
    <div
      className={`d-flex flex-wrap mt-2  ${styles.searched__item_container}`}
    >
      <div className="col-1 col-md-1">
        <FontAwesomeIcon
          icon={faHeart}
          className={`py-1 mb-0 me-2 ${
            isTrackInFavList ? styles.favorite : ""
          }`}
          title="Listen on"
          onClick={onFavSelect}
        />
      </div>
      <div className="col-11 col-md-5">
        <p className={styles.searched_item}>
          <FontAwesomeIcon icon={faRecordVinyl} className="mb-0 me-2" />
          {name}
        </p>
      </div>
      <div className="col-6 col-md-4">
        <p className={styles.searched_item}>
          <FontAwesomeIcon icon={faMicrophone} className="mb-0 me-2" />
          {artist}
        </p>
      </div>
      <div className="col-6 col-md-2 d-flex justify-content-end">
        <p className={styles.searched_item}>
          {numberWithCommas(parseInt(listeners))}
          <FontAwesomeIcon
            icon={faHeadphones}
            className="mb-0 ms-2"
            title="Listeners"
          />
        </p>
      </div>
    </div>
  );
};

export { SearchedSongCard };
