import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../validators/form-validators";
import {SongService} from "../../services/song.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Song} from "../../models/song";
import {ref, Storage, uploadBytes, listAll, getDownloadURL} from "@angular/fire/storage";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Album} from "../../models/album";
import {Artist} from "../../models/artist";
import {ArtistService} from "../../services/artist.service";
import {AlbumService} from "../../services/album.service";
import {firebaseApp$} from "@angular/fire/app";

@Component({
  selector: 'app-songs-add',
  templateUrl: './songs-add.component.html',
  styleUrls: ['./songs-add.component.css']
})
export class SongsAddComponent implements OnInit {
  songsForm: FormGroup = this.formbuilder.group({
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
    trackId: ['', [Validators.required]],
    artistName: ['',[Validators.required]],
    albumsNames: [[''],[Validators.required]]
  });
  song: Song = {
    _id: '',
    name: '',
    year: '',
    img: '',
    artistName: '',
    albumsNames: [''],
    trackId: '',
    dateAdded: '',
    lastUpdated: ''
  }
  toast = {
    header: '',
    body: '',
    duration: 2000
  }
  toastShow = false;
  edit = false;
  imagen: string = '';
  songsList: Song[] = [];
  canciones: string[] = [];
  albumes: Album[] = [];
  artistas: Artist[] = [];
  firebase = require('firebase')
  firestore = this.firebase.firestore();

  constructor(private formbuilder: FormBuilder,
              private songService: SongService,
              private artistService: ArtistService,
              private albumService: AlbumService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: Storage) {
  }

  ngOnInit() {
    this.getTracks();
    this.getAlbums();
    this.getArtists();
  }

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

  addSong() {
    if (this.songsForm.invalid) {
      this.songsForm.markAllAsTouched();
      return;
    }
    this.song = this.songsForm.value;
    const file = this.song.img
    const tiempo = Date.now();
    const dateNow = new Date(tiempo);
    const storage = this.firebase.storage().ref('songs');

    this.song.dateAdded = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();
    this.song.lastUpdated = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();

    this.songService.putSong(this.song);
    this.router.navigateByUrl("songs");
  }

  private toastGenerator(data: any) {
    this.toast.body = data.message;
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false
    }, 2000);
  }



  getTracks() {
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
