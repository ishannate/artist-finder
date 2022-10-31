import { Artist } from "./Artist";
import { Image } from "./Image";
import { Tag } from "./Tag";
import { Wiki } from "./Wiki";

interface Album {
    artist: string;
    image: Image[];
    name: string;
    playcount: number;
    url: string;
    listeners: number;
    tags?: { tag: Tag[] };
    mbid?: string;
    wiki?: Wiki;
    tracks: { track: Track[] }
}

interface SimpleAlbum {
    artist: Artist;
    image: Image[];
    name: string;
    playcount: number;
    url: string;
}

interface AlbumWrapper {
    album: SimpleAlbum[];
}

export { Album, AlbumWrapper, SimpleAlbum };