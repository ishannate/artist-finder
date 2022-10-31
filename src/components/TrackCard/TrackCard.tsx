import {
  faRadio,
  faHeart,
  faRecordVinyl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { removeCharacterFromObject, secondsToHMS } from "../../helpers/helpers";
import { Image } from "../../typings/Image";
import { Track } from "../../typings/Track";
import styles from "./TrackCard.module.css";

interface TrackCardProps {
  track: Track;
  isTrackInFavList: boolean;
  onFavSelectDeselect: () => void;
  isAlbumShown: boolean;
  onOpen: (url: string) => void;
}

const TrackCard: FC<TrackCardProps> = ({
  track,
  isTrackInFavList,
  onFavSelectDeselect,
  isAlbumShown,
  onOpen,
}) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (
      track.album !== undefined &&
      track.album.image &&
      track.album.image.length > 0 &&
      imageUrl === ""
    ) {
      const val = removeCharacterFromObject(
        track.album.image.find((image: Image) => image.size === "small"),
        "#"
      );
      setImageUrl(val.text);
    }
  }, [track, imageUrl]);

  return (
    <div
      className={`${styles.card} py-2 px-4 d-flex flex-wrap align-items-center justify-content-between`}
    >
      <div className="col-1 d-flex align-items-center">
        <FontAwesomeIcon
          icon={faHeart}
          className={`py-1 mb-0 me-2 ${
            isTrackInFavList ? styles.favourite : ""
          } ${styles.selector}`}
          title="Listen on"
          aria-label="fav-select"
          onClick={onFavSelectDeselect}
        />
      </div>
      <div className="col-2 col-md-1 d-flex align-items-center justify-content-end justify-content-md-start">
        {track.duration ? (
          <span
            className={`mb-0 d-flex justify-content-center ${styles.duration}`}
          >
            {secondsToHMS(track.duration)}
          </span>
        ) : (
          <span className="mb-0">---</span>
        )}
      </div>
      <div
        className={`col-9 ${
          isAlbumShown ? "col-md-5" : "col-md-8"
        } d-flex justify-content-start`}
      >
        <p
          className={`mb-0 text-truncate px-2 ${styles.title}`}
          title={track.name}
        >
          <FontAwesomeIcon icon={faRecordVinyl} className="mb-0 me-2" />
          {track.name}
        </p>
      </div>
      {isAlbumShown && (
        <div className="col-7 col-md-3 d-flex align-items-center gap-2 justify-content-start">
          {track.album ? (
            <>
              <img
                alt="album-cover"
                src={imageUrl}
                className={styles.album_image}
              />
              <p className={`mb-0 ms-4 ${styles.artist_title}`}>
                {track.album.title}
              </p>
            </>
          ) : (
            <div />
          )}
        </div>
      )}
      <div className="col-5 col-md-2 d-flex justify-content-end">
        <button
          aria-label="listen-on-last-fm"
          type="button"
          className={`${styles.listen_button}  d-flex align-items-center`}
          onClick={() => onOpen(track.url)}
        >
          <FontAwesomeIcon
            icon={faRadio}
            className="py-1 mb-0 me-2"
            title="Listen on"
          />{" "}
          Listen
        </button>
      </div>
    </div>
  );
};

export { TrackCard };
