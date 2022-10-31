import { useContext, useEffect, useState } from "react";
import { APIContext } from "../context/APIContext";
import { Album } from "../typings/Album";


const useAlbum = (artistName: string, albumName: string) => {
  const [album, setAlbum] = useState<Album | Error | undefined>();
  const apiData = useContext(APIContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${apiData.apiUrl}/2.0/?method=album.getinfo&api_key=${apiData.apiKey}&artist=${artistName}&album=${albumName}&format=json`
      );

      const responseJson = await response.json();

      setAlbum(responseJson.album);
    };

    fetchData();
  }, [albumName, apiData.apiKey, apiData.apiUrl, artistName]);

  return {
    album,
  };
};

export { useAlbum };
