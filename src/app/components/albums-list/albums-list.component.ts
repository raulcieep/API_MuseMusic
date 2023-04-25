import { Component, OnInit } from '@angular/core';
import {Album} from "../../models/album";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlbumService} from "../../services/album.service";
import {SongService} from "../../services/song.service";
import {Song} from "../../models/song";
import {Artist} from "../../models/artist";
import {ArtistService} from "../../services/artist.service";

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  albumsList: Album[] = [];
  albumsListAux: Album[] = [];
  editar: any;
  guardar = false;
  albumsForm: FormGroup = this.formbuilder.group({
    _id: [''],
    name: [''],
    img: [''],
    year: [''],
    songs: [],
    artistName: [''],
    dateAdded: [''],
    lastUpdated: ['']
  });
  album: Album | undefined;
  idAlbum: string = '';
  canciones: Song[] = [];
  artistas: Artist[] = [];

  constructor(private formbuilder: FormBuilder,
              private albumService: AlbumService,
              private songService: SongService,
              private artistService: ArtistService) { }

  get name(): any {
    return this.albumsForm.get('name');
  }

  get year(): any {
    return this.albumsForm.get('year');
  }

  get songs(): any {
    return this.albumsForm.get('songs');
  }

  get artistName(): any {
    return this.albumsForm.get('artistName');
  }

  get img(): any {
    return this.albumsForm.get('img');
  }

  ngOnInit(): void {
    this.listarAlbums();
  }

  search(event: any) {
    this.albumsList = this.albumsListAux.filter(
      (item) => (item.name.toLowerCase().indexOf(event)>=0)
    );
  }

  removeAlbum(album: Album) {
    if (confirm('Desea borrar '+album.name+'?')){
      this.albumService.deleteAlbums(album._id);
      this.listarAlbums();
    }
  }

  loadAlbum(album: Album) {
    this.albumsForm.setValue(album);
    this.editar = true;
    this.getSongs();
    this.getArtists();
    this.album = this.albumsForm.getRawValue();
    this.idAlbum = this.album!._id;
  }

  onSubmit() {
    if (this.editar){
      this.album = this.albumsForm.getRawValue();
      for (let i = 0; i < this.artistas.length; i++) {
        if (this.artistas[i].name == this.album!.artistName){
          this.album!.artistName = this.artistas[i].name;
          break;
        }
      }
      const tiempo = Date.now();
      const dateNow = new Date(tiempo);
      this.album!.lastUpdated = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();
      this.albumService.editAlbums(this.idAlbum, this.album);
      this.listarAlbums();
    }
  }

  listarAlbums() {
    this.albumService.getAlbums().subscribe(data => {
      this.albumsList = [];
      data.forEach((element: any) => {
        this.albumsList.push({
          _id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
      this.albumsListAux = this.albumsList;
    })
  }

  private getSongs() {
    this.songService.getSongs().subscribe(data => {
      this.canciones = [];
      data.forEach((element: any) => {
        this.canciones.push({
          _id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }

  private getArtists() {
    this.artistService.getArtists().subscribe(data => {
      this.artistas = [];
      data.forEach((element: any) => {
        this.artistas.push({
          _id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }
}
