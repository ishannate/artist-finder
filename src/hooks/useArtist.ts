import { useContext } from "react";
import { APIContext } from "../context/APIContext";

const useArtist = () => {
  const apiData = useContext(APIContext);

  const getArtistDetails = async (artistName: string) => {
    const response = await fetch(
      `${apiData.apiUrl}/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiData.apiKey}&format=json`
    );
    if (response) {
      const responseJson = await response.json();
      return responseJson.artist;
    }
  }

  const getAtristAlbums = async (artistName: string) => {
    const response = await fetch(
      `${apiData.apiUrl}/2.0/?method=artist.gettopalbums&artist=${artistName}&api_key=${apiData.apiKey}&format=json`
    );
    if (response) {
      const responseJson = await response.json();
      return responseJson.topalbums;
    }
  }

  const searchArtistByName = async (name: string) => {
    const response = await fetch(
      `${apiData.apiUrl}/2.0/?method=artist.search&artist=${name}&api_key=${apiData.apiKey}&format=json`
    );
    if (response) {
      const responseJson = await response.json();
      return responseJson.results.artistmatches;
    }
  }

  return {
    getArtistDetails,
    getAtristAlbums,
    searchArtistByName
  };
};

export { useArtist };
