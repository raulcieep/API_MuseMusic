import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongService} from "../../services/song.service";
import {ActivatedRoute, Router} from "@angular/router";
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";
import {AlbumService} from "../../services/album.service";
import {FormValidators} from "../../validators/form-validators";
import {Album} from "../../models/album";
import {Song} from "../../models/song";
import {ArtistService} from "../../services/artist.service";
import {Artist} from "../../models/artist";

@Component({
  selector: 'app-albums-add',
  templateUrl: './albums-add.component.html',
  styleUrls: ['./albums-add.component.css']
})
export class AlbumsAddComponent implements OnInit {

  albumsForm: FormGroup = this.formbuilder.group({
    name: ['', [Validators.minLength(2),
      Validators.maxLength(255),
      Validators.required,
      FormValidators.notOnlyWhitespace]],
    year: ['', [Validators.minLength(1),
      Validators.maxLength(255),
      Validators.required,
      FormValidators.notOnlyWhitespace]],
    img: ['', [Validators.required,
      FormValidators.notOnlyWhitespace]],
    songs: [[], [Validators.required]],
    artistName: ['', [Validators.required]]
  });
  toast = {
    header: '',
    body: '',
    duration: 2000
  }
  toastShow = false;
  album: Album = {
    _id: '',
    name: '',
    year: '',
    img: '',
    artistName: '',
    songs: [{
      _id: '',
      name: '',
      img: '',
      trackId: '',
      albumsNames: [''],
      artistName: '',
      lastUpdated: '',
      dateAdded: '',
      year: ''
    }],
    dateAdded: '',
    lastUpdated: ''
  }
  canciones: Song[] = [];
  artistas: Artist[] = [];

  constructor(private formbuilder: FormBuilder,
              private songService: SongService,
              private albumService: AlbumService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: Storage,
              private artistService: ArtistService) { }

  ngOnInit(): void {
    this.getSongs();
    this.getArtists();
  }

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

  addAlbum() {
    if (this.albumsForm.invalid) {
      this.albumsForm.markAllAsTouched();
      return;
    }
    this.album = this.albumsForm.value;
    const tiempo = Date.now();
    const dateNow = new Date(tiempo);
    this.album.dateAdded = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();
    this.album.lastUpdated = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();
    this.albumService.putAlbum(this.album);
    this.router.navigateByUrl("albums");
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
