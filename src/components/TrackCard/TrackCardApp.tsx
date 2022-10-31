import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTrack } from "../../hooks/useTrack";
import { FavoriteSong, updateFavList } from "../../redux/FavoriteSongsReducer";
import { TrackCard } from "./TrackCard";

interface TarckCardAppProps {
  artistName: string;
  name: string;
  isAlbumShown?: boolean;
}

const TrackCardApp: FC<TarckCardAppProps> = ({
  artistName,
  name,
  isAlbumShown = false,
}) => {
  const { track } = useTrack(artistName, name);
  const dispatch = useDispatch();
  const [isTrackInFavList, setIsTrackInFavList] = useState(false);
  const { favoriteList } = useSelector((state: any) => state.favoriteSongs);

  useEffect(() => {
    if (track && !(track instanceof Error)) {
      if (
        favoriteList.find((item: FavoriteSong) => item.mbid === track.mbid) ||
        favoriteList.find(
          (item: FavoriteSong) =>
            item.name === track.name && item.artistName === track.artist.name
        )
      ) {
        setIsTrackInFavList(true);
      }
    }
  }, [favoriteList, track]);

  if (!track) {
    return null;
  }

  if (track instanceof Error) {
    return <p>Something went wrong</p>;
  }

  const onFavSelectDeselect = () => {
    const tempList = [...favoriteList];
    if (isTrackInFavList) {
      dispatch(
        updateFavList(
          tempList.filter(
            (item: FavoriteSong) =>
              item.artistName !== track.artist.name &&
              item.name !== track.name &&
              item.mbid !== track.mbid
          )
        )
      );
    } else {
      tempList.push({
        name: track.name,
        artistName: track.artist.name,
        mbid: track.mbid,
      });
      dispatch(updateFavList(tempList));
    }
    dispatch(updateFavList);
  };

  return (
    <TrackCard
      track={track}
      isTrackInFavList={isTrackInFavList}
      onFavSelectDeselect={onFavSelectDeselect}
      isAlbumShown={isAlbumShown}
    />
  );
};

export { TrackCardApp };
