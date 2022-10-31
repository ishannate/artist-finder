import type { FC } from "react";
import { useAlbum } from "../../hooks/useAlbum";
import { AlbumCard } from "./AlbumCard";

interface AlbumCardAppProps {
  albumName: string;
  artistname: string;
  onAlbumClick: (artistname: string, albumName: string) => void;
}

const AlbumCardApp: FC<AlbumCardAppProps> = ({
  albumName,
  artistname,
  onAlbumClick,
}) => {
  const { album } = useAlbum(artistname, albumName);

  // not showing albums which does not have an mbid
  if (album instanceof Error || !album || !album.mbid) {
    return null;
  }

  return <AlbumCard album={album} onClick={onAlbumClick} />;
};

export { AlbumCardApp };
