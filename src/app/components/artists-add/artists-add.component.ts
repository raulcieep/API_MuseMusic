import { Component, OnInit } from '@angular/core';
import {Artist} from "../../models/artist";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../validators/form-validators";
import {Album} from "../../models/album";
import {Song} from "../../models/song";
import {SongService} from "../../services/song.service";
import {AlbumService} from "../../services/album.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@angular/fire/storage";
import {ArtistService} from "../../services/artist.service";

@Component({
  selector: 'app-artists-add',
  templateUrl: './artists-add.component.html',
  styleUrls: ['./artists-add.component.css']
})
export class ArtistsAddComponent implements OnInit {
  artistForm: FormGroup = this.formbuilder.group({
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
    albums: [[], [Validators.required]]

  });
  toast = {
    header: '',
    body: '',
    duration: 2000
  }
  toastShow = false;
  artist: Artist = {
    _id: '',
    name: '',
    year: '',
    albums: [],
    songs: [],
    img: '',
    dateAdded: '',
    lastUpdated: ''
  }
  albumes: Album[] = [];
  canciones: Song[] = [];


  constructor(private formbuilder: FormBuilder,
              private songService: SongService,
              private albumService: AlbumService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: Storage,
              private artistService: ArtistService) { }

  ngOnInit(): void {
    this.getSongs();
    this.getAlbums();
    console.log(this.canciones);
    console.log(this.albumes);
  }

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

  addArtist() {
    if (this.artistForm.invalid) {
      this.artistForm.markAllAsTouched();
      return;
    }
    this.artist = this.artistForm.value;
    const tiempo = Date.now();
    const dateNow = new Date(tiempo);
    this.artist.dateAdded = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();
    this.artist.lastUpdated = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString();
    this.artistService.putArtist(this.artist);
    this.router.navigateByUrl("artists");
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
