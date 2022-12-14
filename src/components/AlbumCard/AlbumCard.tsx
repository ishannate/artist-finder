import type { FC } from "react";
import { useState, useEffect } from "react";
import { removeCharacterFromObject } from "../../helpers/helpers";
import { Album } from "../../typings/Album";
import { Image } from "../../typings/Image";
import Moment from "moment";
import styles from "./AlbumCard.module.css";
import { Audio } from "react-loader-spinner";

interface AlbumCardProps {
  album: Album;
  onClick: (artistname: string, albumName: string) => void;
}

const AlbumCard: FC<AlbumCardProps> = ({ album, onClick }) => {
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
      className="col-12 col-md-6 col-lg-4 d-flex flex-column mb-3 gap-md-3 gap-3 justify-content-between"
      aria-label="album-card"
      onClick={() => {
        onClick(album.artist, album.name);
      }}
    >
      <div>
        {imageUrl !== "" ? (
          <img alt="album" src={imageUrl} className={`${styles.image} w-100`} />
        ) : (
          <div className="d-flex justify-content-center centered my-5">
            <Audio
              height="170"
              width="30"
              color="#275c82"
              ariaLabel="three-dots-loading"
            />
          </div>
        )}
        <p className={`${styles.title}`}>{album.name}</p>
      </div>
      <p>Year : {Moment(album.wiki?.published).format("yyyy")}</p>
    </div>
  );
};

export { AlbumCard };
