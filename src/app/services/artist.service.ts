import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {Artist} from "../models/artist";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private firebase: AngularFirestore) { }

  putArtist(artist: Artist) : Promise<any>{
    return this.firebase.collection('artists').add(artist);
  }

  getArtists() : Observable<any>{
    return this.firebase.collection('artists').snapshotChanges();
  }

  deleteArtists(id: string) : Promise<any>{
    return this.firebase.collection('artists').doc(id).delete()
  }

  editArtists(id: string, artist: any): Promise<any>{
    return this.firebase.collection('artists').doc(id).update(artist);
  }
}
