import { Image } from "./Image";
import { Tag } from "./Tag";
import { Wiki } from "./Wiki";

interface Track {
  streamable: Streamable;
  mbid?: string;
  duration: number | null;
  name: string;
  url: string;
  artist: DisplayArtist;
  attr: {
    rank: number,
    position: number
  }
  album: DisplayAlbum;
  listeners: number;
  playcount: number;
  topTags: { tag: Tag[] }
  wiki: Wiki;
}

interface Streamable {
  fulltrack: number;
}

interface DisplayArtist {
  url: string;
  name: string;
  mbid: string;
}

interface DisplayAlbum {
  artist: string;
  title: string;
  mbid: string;
  url: string;
  image: Image[]
}

interface SearchTrack {
  artist: string;
  name: string;
  mbid: string;
  listeners: string;
  image: Imagep[];
}

export { Track, SearchTrack }