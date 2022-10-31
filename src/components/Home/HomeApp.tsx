import type { FC } from "react";
import { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useArtist } from "../../hooks/useArtist";
import { AlbumWrapper } from "../../typings/Album";
import { Artist } from "../../typings/Artist";
import { InitialSearchArtist } from "../InitialSerachArtist/InitialSearchArtist";
import { Home } from "./Home";

const HomeApp: FC = () => {
  const { name } = useSelector((state: any) => state.artist);
  const [isNameSelected, setIsNameSelected] = useState(false);
  const { getArtistDetails, getAtristAlbums } = useArtist();
  const [artistDetails, setArtistDetails] = useState<Artist | Error>();
  const [artistAlbums, setArtistAlbums] = useState<AlbumWrapper | Error>();
  const [loadNewArtistData, setLoadNewArtistData] = useState(true);
  const [loadNewAlbumData, setLoadNewAlbumtData] = useState(true);

  useEffect(() => {
    if (name && loadNewArtistData) {
      const fetchData = async () => {
        const artistDetailsResponse = await getArtistDetails(name);
        if (artistDetailsResponse) {
          setArtistDetails(artistDetailsResponse);
          setLoadNewArtistData(false);
        }
      };

      fetchData();
    }
  }, [artistDetails, getArtistDetails, name, loadNewArtistData]);

  useEffect(() => {
    if (name && loadNewAlbumData) {
      const fetchData = async () => {
        const albumsResponse = await getAtristAlbums(name);
        setArtistAlbums(albumsResponse);
        setLoadNewAlbumtData(false);
      };

      fetchData();
    }
  }, [artistAlbums, getAtristAlbums, name, loadNewAlbumData]);

  useEffect(() => {
    setIsNameSelected(name !== "");
  }, [name]);

  useEffect(() => {
    setLoadNewArtistData(true);
    setLoadNewAlbumtData(true);
  }, [name]);

  if (artistDetails instanceof Error) {
    return <p>Error loading data</p>;
  }
  return (
    <>
      {isNameSelected ? (
        <>
          {artistDetails ? (
            <Home artistDetails={artistDetails} artistAlbums={artistAlbums} />
          ) : (
            <div className="d-flex justify-content-center centered my-5">
              <Audio
                height="300"
                width="300"
                color="#275c82"
                ariaLabel="three-dots-loading"
              />
            </div>
          )}
        </>
      ) : (
        <InitialSearchArtist />
      )}
    </>
  );
};

export { HomeApp };
