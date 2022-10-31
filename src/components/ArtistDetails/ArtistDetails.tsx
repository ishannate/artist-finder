import type { FC } from "react";
import { useState, useEffect } from "react";
import styles from "./ArtistDetails.module.css";
import { Artist } from "../../typings/Artist";
import cardbackground from "../../assets/images/dark-blue.jpeg";
import {
  numberWithCommas,
  openInNewTab,
  removeCharacterFromObject,
} from "../../helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPlay,
  faRadio,
} from "@fortawesome/free-solid-svg-icons";
import TagLabel from "../Tag/TagLabel";
import { Tag } from "../../typings/Tag";
import SubHeader from "../SubHeader/SubHeader";
import { useSelector } from "react-redux";
import { Image } from "../../typings/Image";

interface ArtistDetailsProps {
  artist: Artist;
}

const ArtistDetails: FC<ArtistDetailsProps> = ({ artist }) => {
  const { image } = useSelector((state: any) => state.artistImage);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (artist && imageUrl === "") {
      const val = removeCharacterFromObject(
        artist.image.find((image: Image) => image.size === "large") || {},
        "#"
      );
      setImageUrl(val.text);
    }
  }, [artist, imageUrl]);

  useEffect(() => {
    if (image && image !== "" && image !== null) {
      setImageUrl(image);
    }
  }, [image]);

  return (
    <div className="w-100">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundImage: `url(${cardbackground})` }}
      >
        <div className="mt-5">
          {imageUrl !== "" && (
            <img alt="artist_img" src={image} className={styles.artist_image} />
          )}
        </div>
        <p className={styles.header}>{artist.name}</p>
        <a
          href={artist.url}
          className={`d-flex align-items-center ${styles.link}`}
        >
          <FontAwesomeIcon
            icon={faRadio}
            className="py-1 mb-0 me-2"
            title="Listen on"
          />
          Check on Last Fm
        </a>
        <div
          className={`d-flex flex-column flex-lg-row justify-content-between ${styles.stats_banner} mt-3 px-5`}
        >
          <div className="d-flex justify-content-center align-items-center gap-2">
            <p className={`my-0 ${styles.stat_value}`}>
              <FontAwesomeIcon
                icon={faPlay}
                className="mb-0 me-2 text-success"
              />{" "}
              {numberWithCommas(artist.stats.playcount)}
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <p className={`my-0 ${styles.stat_value}`}>
              <FontAwesomeIcon
                icon={faMicrophone}
                className={`mb-0 me-2 ${styles.link}`}
              />{" "}
              {numberWithCommas(artist.stats.listeners)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 px-4 mt-4">
        <SubHeader>Tags</SubHeader>
        {artist.tags && (
          <div className="d-flex flex-wrap justify-content-between gap-2 mb-4">
            {artist.tags.tag.map((tag: Tag) => (
              <TagLabel
                key={tag.url}
                textColor="#00bceb"
                onClick={() => openInNewTab(tag.url)}
              >
                {tag.name}
              </TagLabel>
            ))}
          </div>
        )}
      </div>
      <div className="w-100 px-4 mt-4">
        <SubHeader>Description</SubHeader>
        <p className={styles.text}>{artist.bio.summary}</p>
      </div>
    </div>
  );
};

export { ArtistDetails };
