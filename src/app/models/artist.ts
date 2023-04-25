import {Album} from "./album";
import {Song} from "./song";

export interface Artist {
  _id: string,
  name: string,
  year: string,
  albums: Album[],
  songs: Song[],
  img: string,
  dateAdded: string,
  lastUpdated: string
}
