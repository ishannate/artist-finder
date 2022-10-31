/* istanbul ignore file */
import type { FC } from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useArtist } from "../../hooks/useArtist";
import { artistImageChange } from "../../redux/ArtistImageReducer";
import { artistNameChange } from "../../redux/ArtistReducer";
import { Artist } from "../../typings/Artist";
import { SearchArtist } from "./SearchArtist";

interface SearchArtistListProps {
  searchedArtistName?: string;
}

const SearchArtistApp: FC<SearchArtistListProps> = ({ searchedArtistName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchArtistByName } = useArtist();
  const [artistList, setArtistList] = useState<Artist[]>();

  const onNameSearch = async (name: string) => {
    const response = await searchArtistByName(name);
    setArtistList(response.artist);
  };

  useEffect(() => {
    if (searchedArtistName) {
      dispatch(artistNameChange(searchedArtistName));
    }
  }, [dispatch, searchedArtistName]);

  const onArtistSelect = (artistName: string) => {
    dispatch(artistNameChange(artistName));
    dispatch(artistImageChange(""));
    navigate("/");
  };

  return (
    <SearchArtist
      onNameSearch={onNameSearch}
      artistList={artistList}
      onArtistSearch={onArtistSelect}
    />
  );
};

export { SearchArtistApp };
