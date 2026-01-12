import type { Artist } from "./artist"
import type { Album } from "./album";

export interface Song {
  id: number;
  title: string;
  artist_id: number;
  album_id: number;
  duration: number; // en segundos
  file_url: string;
  created_at: string; // o Date si planeas convertirlo
  artist: Artist;
  album: Album;
}