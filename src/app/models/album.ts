import {Song} from "./song";

export interface Album {
  _id : string,
  name: string,
  year: string,
  artistName: string,
  songs: [Song],
  img: string,
  dateAdded: string,
  lastUpdated: string
}
