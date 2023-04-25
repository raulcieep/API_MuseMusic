import { Component, OnInit } from '@angular/core';
import {Artist} from "../../models/artist";
import {Song} from "../../models/song";
import {Album} from "../../models/album";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlbumService} from "../../services/album.service";
import {SongService} from "../../services/song.service";
import {ArtistService} from "../../services/artist.service";

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.css']
})
export class ArtistsListComponent implements OnInit {
  artistList: Artist[] = [];
  artistListAux: Artist[] = [];
  editar: any;
  canciones: Song[] = [];
  albumes: Album[] = [];
  guardar = false;
  idArtist: string = '';
  artist: Artist | undefined;
  artistForm: FormGroup = this.formbuilder.group({
    _id: [''],
    name: [''],
    img: [''],
    year: [''],
    songs: [],
    albums: [],
    dateAdded: [''],
    lastUpdated: ['']
  });

  constructor(private formbuilder: FormBuilder,
              private albumService: AlbumService,
              private songService: SongService,
              private artistService: ArtistService) { }

  get name(): any {
    return this.artistForm.get('name');
  }

  get year(): any {
    return this.artistForm.get('year');
  }

  get songs(): any {
    return this.artistForm.get('songs');
  }

  get albums(): any {
    return this.artistForm.get('albums');
  }

  get img(): any {
    return this.artistForm.get('img');
  }

  ngOnInit(): void {
    this.listarArtistas();
  }

  search(event: any) {
    this.artistList = this.artistListAux.filter(
      (item) => (item.name.toLowerCase().indexOf(event)>=0)
    );
  }

  removeArtist(artist: Artist) {
    if (confirm('Desea borrar '+artist.name+'?')){
      this.artistService.deleteArtists(artist._id);
      this.listarArtistas();
    }
  }

  loadArtist(artist: Artist) {
    this.artistForm.setValue(artist);
    this.editar = true;
    this.getSongs();
    this.getAlbums()
    this.artist = this.artistForm.getRawValue();
    this.idArtist = this.artist!._id;
  }

  onSubmit() {
    if (this.editar){
      this.artist = this.artistForm.getRawValue();
      const tiempo = Date.now();
      const dateNow = new Date(tiempo);
      this.artist!.lastUpdated = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();
      this.artistService.editArtists(this.idArtist, this.artist);
      this.listarArtistas();
    }
  }

  listarArtistas() {
    this.artistService.getArtists().subscribe(data => {
      this.artistList = [];
      data.forEach((element: any) => {
        this.artistList.push({
          _id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
      this.artistListAux = this.artistList;
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

  private getAlbums() {
    this.albumService.getAlbums().subscribe(data => {
      this.albumes = [];
      data.forEach((element: any) => {
        this.albumes.push({
          _id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }
}
