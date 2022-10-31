import type { FC } from "react";
import { useState, useEffect } from "react";
import { AlbumWrapper } from "../../typings/Album";
import { Artist } from "../../typings/Artist";
import { AlbumDetailsApp } from "../AlbumDetails/AlbumDetailsApp";
import { AlbumList } from "../AlbumList/AlbumList";
import { ArtistDetails } from "../ArtistDetails/ArtistDetails";
import styles from "./Home.module.css";

interface HomeProps {
  artistDetails: Artist;
  artistAlbums: AlbumWrapper | Error | undefined;
}

const Home: FC<HomeProps> = ({ artistDetails, artistAlbums }) => {
  const [albumQueryData, setAlbumQueryData] = useState<{
    artistName: string;
    albumName: string;
  } | null>(null);
  const [viewPage, setViewPage] = useState<"list" | "album">("list");

  const onAlbumClick = (artistName: string, albumName: string) => {
    setAlbumQueryData({ artistName: artistName, albumName: albumName });
  };

  useEffect(() => {
    setViewPage(albumQueryData !== null ? "album" : "list");
  }, [albumQueryData]);

  const onBackFromDetailsPage = () => {
    setViewPage("list");
  };

  useEffect(() => {
    setViewPage("list");
  }, [artistAlbums]);

  return (
    <>
      {artistDetails && (
        <div
          className={`d-flex flex-column flex-lg-row ${styles.home_container} shadow-lg`}
        >
          <div className="col-lg-4">
            <ArtistDetails artist={artistDetails} />
          </div>
          <div className="col-lg-8">
            {viewPage === "album" && albumQueryData ? (
              <AlbumDetailsApp
                albumName={albumQueryData.albumName}
                artistname={albumQueryData.artistName}
                onBack={onBackFromDetailsPage}
              />
            ) : (
              <>
                {artistAlbums && !(artistAlbums instanceof Error) ? (
                  <AlbumList
                    albums={artistAlbums}
                    onAlbumClick={onAlbumClick}
                  />
                ) : (
                  <p>Oops something went wrong</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export { Home };
