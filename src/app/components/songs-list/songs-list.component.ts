import { Component, OnInit } from '@angular/core';
import {Song} from "../../models/song";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../validators/form-validators";
import {SongService} from "../../services/song.service";
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";
import {Album} from "../../models/album";
import {Artist} from "../../models/artist";
import {AlbumService} from "../../services/album.service";
import {ArtistService} from "../../services/artist.service";

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {
  songsList: Song[] = [];
  songsListAux: Song[] = [];
  editar: boolean = true;
  songsForm: FormGroup = this.formbuilder.group({
    _id: [''],
    name: [''],
    img: [''],
    year: [''],
    albumsNames: [['']],
    artistName: [''],
    trackId : [''],
    dateAdded: '',
    lastUpdated: ''
  });
  guardar = false;
  toast = {
    header: '',
    body: '',
    duration: 2000
  }
  canciones: string[] = [];
  song: Song | undefined;
  idSong: string = '';
  albumes: Album[] = [];
  artistas: Artist[] = [];

  get name(): any {
    return this.songsForm.get('name');
  }

  get year(): any {
    return this.songsForm.get('year');
  }

  get trackId(): any {
    return this.songsForm.get('trackId');
  }

  get artistName(): any {
    return this.songsForm.get('artistName');
  }

  get albumsNames(): any {
    return this.songsForm.get('albumsNames');
  }

  get img(): any {
    return this.songsForm.get('img');
  }


  constructor(private songService: SongService,
              private formbuilder: FormBuilder,
              private storage: Storage,
              private albumService: AlbumService,
              private artistService: ArtistService) { }

  ngOnInit(): void {
    this.listarCanciones();
    this.getArtists();
    this.getAlbums();
  }

  search(event: any) {
    this.songsList = this.songsListAux.filter(
      (item) => (item.name.toLowerCase().indexOf(event)>=0)
    );
  }

  removeSong(song: Song) {
    if (confirm('Desea borrar '+song.name+'?')){
      this.songService.deleteSong(song._id);
      this.listarCanciones();
    }

  }

  loadSong(song: Song) {
    this.songsForm.setValue(song);
    console.log(this.songsForm.get('img'));
    this.editar = true;
    this.loadTracks();
    this.song = this.songsForm.getRawValue();
    this.idSong = this.song!._id;
  }

  onSubmit() {
    if (this.editar){
      this.song = this.songsForm.getRawValue();
      const tiempo = Date.now();
      const dateNow = new Date(tiempo);
      this.song!.lastUpdated = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();
      this.songService.editSong(this.idSong, this.song);
      this.listarCanciones();
    }
  }

  private listarCanciones() {
    this.songService.getSongs().subscribe(data => {
      this.songsList = [];
      data.forEach((element: any) => {
        this.songsList.push({
          _id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
      this.songsListAux = this.songsList;
    })
  }

  private loadTracks() {
    const trackRef = ref(this.storage, 'tracks');
    listAll(trackRef).then(async response => {
      for (let item of response.items) {
        const url = await getDownloadURL(item);
        this.canciones[this.canciones.length] = item.name;
      }
    }).catch((error: any) => console.log(error))
  }

  private getAlbums() {
    this.albumService.getAlbums().subscribe(data => {
      data.forEach((element: any) => {
        this.albumes.push({
          _id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }

  private getArtists() {
    this.artistService.getArtists().subscribe(data => {
      data.forEach((element: any) => {
        this.artistas.push({
          _id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }
}
