import { Image } from "./Image";
import { Link } from "./Link";
import { Tag } from "./Tag";

interface Stats {
  listeners: number;
  playcount: number;
}

interface Bio {
  Links: Link[];
  summary: string;
  content: string;
}

interface Artist {
  name: string;
  mbid?: string;
  image: Image[];
  url: string;
  tags: { tag: Tag[] };
  bio: Bio;
  stats: Stats;
}



export { Artist, Stats };