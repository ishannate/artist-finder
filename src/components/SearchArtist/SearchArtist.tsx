import type { FC } from "react";
import { useState } from "react";
import { Artist } from "../../typings/Artist";
import styles from "./SearchArtist.module.css";

interface SearchArtistProps {
  onNameSearch: (name: string) => void;
  artistList: Artist[] | undefined;
  onArtistSearch: (name: string) => void;
}

const SearchArtist: FC<SearchArtistProps> = ({
  onNameSearch,
  artistList,
  onArtistSearch,
}) => {
  const [enteredName, setEnteredName] = useState("");

  const onNameChange = (name: string) => {
    onNameSearch(name);
    setEnteredName(name);
  };

  const onselect = (name: string) => {
    onArtistSearch(name);
    setEnteredName("");
  };

  return (
    <div className="w-100 my-2">
      <input
        type="text"
        className="form-control w-100"
        placeholder="Search Artist"
        onChange={(e) => onNameChange(e.target.value)}
      />

      {enteredName && enteredName.length > 1 && artistList && (
        <div className={styles.search_container}>
          <div className={`w-100 ${styles.artist_container}`}>
            {artistList.map((artist: Artist) => (
              <div
                key={artist.name + artist.mbid}
                className={`px-4 ${styles.artist_name}`}
                onClick={() => {
                  onselect(artist.name);
                }}
              >
                {artist.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchArtist };
