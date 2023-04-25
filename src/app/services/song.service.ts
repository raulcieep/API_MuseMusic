import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Song} from "../models/song";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor( private firebase: AngularFirestore) { }

  putSong(song: Song) : Promise<any>{
   return this.firebase.collection('songs').add(song);
  }

  getSongs() : Observable<any>{
    return this.firebase.collection('songs').snapshotChanges();
  }

  deleteSong(id: string) : Promise<any>{
    return this.firebase.collection('songs').doc(id).delete()
  }

  editSong(id: string, song: any): Promise<any>{
    return this.firebase.collection('songs').doc(id).update(song);
  }
}
