export interface Song {
  _id: string,
  name: string,
  year: string,
  img: string,
  artistName: string,
  albumsNames: [string],
  trackId: string,
  dateAdded: string,
  lastUpdated: string
}
