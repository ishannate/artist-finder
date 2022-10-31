import type { FC } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useAlbum } from "../../hooks/useAlbum";
import { Track } from "../../typings/Track";
import { TrackCardApp } from "../TrackCard/TrackCardApp";
import { AlbumDetails } from "./AlbumDetails";
import styles from "./AlbumDetails.module.css";

interface AlbumDetailsAppProps {
  artistname: string;
  albumName: string;
  onBack: () => void;
}

const AlbumDetailsApp: FC<AlbumDetailsAppProps> = ({
  artistname,
  albumName,
  onBack,
}) => {
  const { album } = useAlbum(artistname, albumName);

  if (!album) {
    return (
      <div className="d-flex justify-content-center centered my-auto">
        <ThreeDots
          height="300"
          width="300"
          color="#275c82"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }
  // not showing albums which does not have an mbid
  if (album instanceof Error || !album.mbid) {
    return null;
  }
  return (
    <div className="w-100 mx-0 px-0">
      <AlbumDetails album={album} onBack={onBack} />
      <div className="w-100 p-4">
        <p className={styles.header}>Track List</p>
        {album.tracks.track.length > 0 ? (
          album.tracks.track.map((track: Track) => (
            <TrackCardApp
              key={track.name + track.name}
              name={track.name}
              artistName={track.artist.name}
            />
          ))
        ) : (
          <p className="error-message">Sorry no records found</p>
        )}
      </div>
    </div>
  );
};

export { AlbumDetailsApp };
