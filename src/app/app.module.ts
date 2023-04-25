import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { SongsEditComponent } from './components/songs-edit/songs-edit.component';
import { SongsAddComponent } from './components/songs-add/songs-add.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumsEditComponent } from './components/albums-edit/albums-edit.component';
import { AlbumsAddComponent } from './components/albums-add/albums-add.component';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';
import { ArtistsAddComponent } from './components/artists-add/artists-add.component';
import { ArtistsEditComponent } from './components/artists-edit/artists-edit.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { UploadMusicComponent } from './components/upload-music/upload-music.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SongsListComponent,
    SongsEditComponent,
    SongsAddComponent,
    AlbumsListComponent,
    AlbumsEditComponent,
    AlbumsAddComponent,
    ArtistsListComponent,
    ArtistsAddComponent,
    ArtistsEditComponent,
    UploadMusicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    AngularFirestoreModule,
    AngularFireModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage())
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
