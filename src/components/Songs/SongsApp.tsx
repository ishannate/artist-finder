import type { FC } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTrack } from "../../hooks/useTrack";
import { SearchTrack } from "../../typings/Track";
import { Songs } from "./Songs";

const SongsApp: FC = () => {
  const { favouriteList } = useSelector((state: any) => state.favouriteSongs);
  const [searchedSongsList, setSearchedSongsList] = useState<SearchTrack[]>();
  const { searchTrackByName } = useTrack();

  const onSearchSong = async (name: string) => {
    if (name.length > 1) {
      const response = await searchTrackByName(name);
      setSearchedSongsList(response.track);
    } else {
      setSearchedSongsList([]);
    }
  };

  return (
    <Songs
      favouriteList={favouriteList}
      onSearchSong={onSearchSong}
      searchList={searchedSongsList}
    />
  );
};

export { SongsApp };
