import type { Artist } from "./artist"
import type { Album } from "./album";

export interface Song {
  id: number;
  title: string;
  artist_id: number;
  album_id: number;
  duration: number;
  file_url: string;
  created_at: string;
  artist: Artist;
  album: Album;
}