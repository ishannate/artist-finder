import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteSong, updateFavList } from "../../redux/FavoriteSongsReducer";
import { SearchedSongCard } from "./SearchedSongCard";

interface SearchedSongCardAppProps {
  artist: string;
  name: string;
  listeners: string;
  mbid: string;
}

const SearchedSongCardApp: FC<SearchedSongCardAppProps> = ({
  name,
  artist,
  listeners,
  mbid,
}) => {
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state: any) => state.favoriteSongs);

  const onSelectFav = (isTrackInFavList: boolean) => {
    const tempList = [...favoriteList];
    if (isTrackInFavList) {
      dispatch(
        updateFavList(
          tempList.filter(
            (item: FavoriteSong) =>
              item.artistName !== artist &&
              item.name !== name &&
              item.mbid !== mbid
          )
        )
      );
    } else {
      tempList.push({
        name: name,
        artistName: artist,
        mbid: mbid,
      });
      dispatch(updateFavList(tempList));
    }
    dispatch(updateFavList);
  };
  return (
    <SearchedSongCard
      artist={artist}
      name={name}
      listeners={listeners}
      onSelectFav={onSelectFav}
    />
  );
};

export { SearchedSongCardApp };
