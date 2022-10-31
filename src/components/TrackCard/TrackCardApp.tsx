/* istanbul ignore file */
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openInNewTab } from "../../helpers/helpers";
import { useTrack } from "../../hooks/useTrack";
import { FavouriteSong, updateFavList } from "../../redux/FavoriteSongsReducer";
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
  const { favouriteList } = useSelector((state: any) => state.favouriteSongs);

  useEffect(() => {
    if (track && !(track instanceof Error)) {
      if (
        favouriteList.find(
          (item: FavouriteSong) =>
            item.name === track.name &&
            item.artistName === track.artist.name &&
            item.mbid === track.mbid
        )
      ) {
        setIsTrackInFavList(true);
      } else {
        setIsTrackInFavList(false);
      }
    }
  }, [favouriteList, track]);

  if (!track) {
    return null;
  }

  if (track instanceof Error) {
    return <p>Something went wrong</p>;
  }

  const onFavSelectDeselect = () => {
    const tempList = [...favouriteList];
    if (isTrackInFavList) {
      const value = tempList.filter(
        (item: FavouriteSong) =>
          item.mbid !== track.mbid ||
          (item.artistName !== track.artist.name && item.name !== track.name)
      );
      dispatch(updateFavList(value));
      setIsTrackInFavList(false);
    } else {
      tempList.push({
        name: track.name,
        artistName: track.artist.name,
        mbid: track.mbid,
      });
      dispatch(updateFavList(tempList));
      setIsTrackInFavList(true);
    }
  };

  return (
    <TrackCard
      track={track}
      isTrackInFavList={isTrackInFavList}
      onFavSelectDeselect={onFavSelectDeselect}
      isAlbumShown={isAlbumShown}
      onOpen={openInNewTab}
    />
  );
};

export { TrackCardApp };
