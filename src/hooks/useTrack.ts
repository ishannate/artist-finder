import { useContext, useEffect, useState } from "react";
import { APIContext } from "../context/APIContext";
import { Track } from "../typings/Track";

const useTrack = (artistName?: string, trackname?: string, albumName?: string) => {
  const [track, setTrack] = useState<Track | Error | undefined>();
  const apiData = useContext(APIContext);

  useEffect(() => {
    if (artistName && trackname) {
      const fetchData = async () => {
        const response = await fetch(
          `${apiData.apiUrl}/2.0/?method=track.getinfo&api_key=${apiData.apiKey}&artist=${artistName}&track=${trackname}&format=json`
        );

        const responseJson = await response.json();
        setTrack(responseJson.track);
      };

      fetchData();
    }
  }, [albumName, apiData.apiKey, apiData.apiUrl, artistName, trackname]);

  const searchTrackByName = async (name: string) => {
    const response = await fetch(
      `${apiData.apiUrl}/2.0/?method=track.search&track=${name}&api_key=${apiData.apiKey}&format=json`
    );
    if (response) {
      const responseJson = await response.json();
      return responseJson.results.trackmatches;
    }
  }

  return {
    track,
    searchTrackByName
  };
};

export { useTrack };
