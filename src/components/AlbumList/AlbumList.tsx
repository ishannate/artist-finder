import type { FC } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeCharacterFromObject } from "../../helpers/helpers";
import { artistImageChange } from "../../redux/ArtistImageReducer";
import { AlbumWrapper, SimpleAlbum } from "../../typings/Album";
import { Image } from "../../typings/Image";
import { AlbumCardApp } from "../AlbumCard/AlbumCardApp";
import styles from "./AlbumList.module.css";

interface AlbumListProps {
  albums: AlbumWrapper;
  onAlbumClick: (artistname: string, albumName: string) => void;
}

const AlbumList: FC<AlbumListProps> = ({ albums, onAlbumClick }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const val = removeCharacterFromObject(
      albums.album
        .filter((item: SimpleAlbum) => item.name !== null)[1]
        .image.find((image: Image) => image.size === "large") || {},
      "#"
    );

    dispatch(artistImageChange(val.text));
  }, [albums, dispatch]);

  return (
    <div className="p-4 w-full">
      <p className={styles.title}>Albums</p>
      <div className="row mt-4">
        {albums &&
          albums.album
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((album: SimpleAlbum) => (
              <AlbumCardApp
                key={album.name + album.artist}
                albumName={album.name}
                artistname={album.artist.name}
                onAlbumClick={onAlbumClick}
              />
            ))}
      </div>
    </div>
  );
};

export { AlbumList };
