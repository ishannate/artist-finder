import type { FC } from "react";
import { useState } from "react";
import { FavouriteSong } from "../../redux/FavoriteSongsReducer";
import { SearchTrack } from "../../typings/Track";
import { SearchedSongCardApp } from "../SearchedSongCard/SearchedSongCardApp";
import { TrackCardApp } from "../TrackCard/TrackCardApp";
import styles from "./Songs.module.css";

interface SongsProps {
  favouriteList: FavouriteSong[];
  onSearchSong: (name: string) => void;
  searchList: SearchTrack[] | undefined;
}

const Songs: FC<SongsProps> = ({ favouriteList, onSearchSong, searchList }) => {
  const [searchName, setSearchName] = useState("");

  const onNameChange = (name: string) => {
    setSearchName(name);
    if (name.length > 1) {
      onSearchSong(name);
    }
  };

  return (
    <div className="w-100 bg-white v-100 min-vh-100 shadow">
      <div className={`w-100 ${styles.header_banner} `}>
        <p className={`mb-0 ${styles.header}`}>Songs </p>
      </div>
      <div className="w-100 px-4 mt-4">
        <p className={` ${styles.sub_header} mb-3`}>Search Song</p>
        <input
          type="input"
          className="w-100 form-control"
          placeholder="Search a song ..."
          onChange={(e) => onNameChange(e.target.value)}
        />
        {searchList && searchName.length >= 1 && (
          <div className={`w-100 ${styles.search_list}`}>
            {searchList.map((item: SearchTrack) => (
              <SearchedSongCardApp
                key={item.name + item.mbid + item.artist}
                artist={item.artist}
                name={item.name}
                listeners={item.listeners}
                mbid={item.mbid}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-100 px-4 mt-5 pb-5">
        <p className={`${styles.sub_header} mb-3`}>Favourite Songs List</p>
        {favouriteList.map((item: FavouriteSong) => (
          <TrackCardApp
            key={item.name + item.mbid}
            name={item.name}
            artistName={item.artistName}
            isAlbumShown
          />
        ))}
      </div>
    </div>
  );
};

export { Songs };
