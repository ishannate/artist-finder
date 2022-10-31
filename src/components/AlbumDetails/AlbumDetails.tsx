import type { FC } from "react";
import { useState, useEffect } from "react";
import {
  numberWithCommas,
  openInNewTab,
  removeCharacterFromObject,
} from "../../helpers/helpers";
import { Album } from "../../typings/Album";
import { Image } from "../../typings/Image";
import { Tag } from "../../typings/Tag";
import styles from "./AlbumDetails.module.css";
import { faChevronLeft, faRadio } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TagLabel from "../Tag/TagLabel";

interface AlbumDetailsProps {
  album: Album;
  onBack: () => void;
}

const AlbumDetails: FC<AlbumDetailsProps> = ({ album, onBack }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (album && imageUrl === "") {
      const val = removeCharacterFromObject(
        album.image.find((image: Image) => image.size === "large") || {},
        "#"
      );
      setImageUrl(val.text);
    }
  }, [album, imageUrl]);

  return (
    <div
      className={`bg-dark d-flex flex-column flex-md-row px-0 ${styles.content}`}
    >
      <button
        aria-label="back-button"
        type="button"
        onClick={onBack}
        className={`${styles.back_button} mt-2`}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="py-1 mb-0"
          title="Back"
        />
      </button>
      <button
        aria-label="open-in-tab"
        type="button"
        className={`${styles.listen_button}  d-flex align-items-center`}
        onClick={() => openInNewTab(album.url)}
      >
        <FontAwesomeIcon
          icon={faRadio}
          className="py-1 mb-0 me-2"
          title="Listen on"
        />{" "}
        Listen on Last FM
      </button>
      <img alt="album" src={imageUrl} className={styles.image} />
      <div className="d-flex flex-column align-items-between w-100">
        <div className="d-flex flex-column  px-4 py-4">
          <p className={`text-white mb-0 ${styles.title}`}>{album.name}</p>
          <p className="text-white mb-0">Arist : {album.artist}</p>
          {/* istanbul ignore next */}
          {album.tags && (
            <div className="d-flex flex-wrap justify-content-start gap-3 mt-4 mb-4">
              {album.tags.tag.map((tag: Tag) => (
                <TagLabel
                  key={tag.url}
                  textColor="white"
                  onClick={() => {
                    /* istanbul ignore next */
                    openInNewTab(tag.url);
                  }}
                >
                  {tag.name}
                </TagLabel>
              ))}
            </div>
          )}
        </div>
        <div
          className={`d-flex justify-content-between ${styles.stats_banner} px-5`}
        >
          <div className="d-flex justify-content-center align-items-center gap-2">
            <p className={`${styles.stat_label} my-0`}>Play count</p>
            <p className={`my-0 ${styles.stat_value}`}>
              {numberWithCommas(album.playcount)}
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <p className={`${styles.stat_label} my-0`}>listeners</p>
            <p className={`my-0 ${styles.stat_value}`}>
              {numberWithCommas(album.listeners)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AlbumDetails };
