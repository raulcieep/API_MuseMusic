import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Album} from "../models/album";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Song} from "../models/song";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor( private firebase: AngularFirestore) {
  }

  putAlbum(album: Album) : Promise<any>{
    return this.firebase.collection('albums').add(album);
  }

  getAlbums() : Observable<any>{
    return this.firebase.collection('albums').snapshotChanges();
  }

  deleteAlbums(id: string) : Promise<any>{
    return this.firebase.collection('albums').doc(id).delete()
  }

  editAlbums(id: string, album: any): Promise<any>{
    return this.firebase.collection('albums').doc(id).update(album);
  }
}
