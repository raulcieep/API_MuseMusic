import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SongsListComponent} from "./components/songs-list/songs-list.component";
import {SongsEditComponent} from "./components/songs-edit/songs-edit.component";
import {SongsAddComponent} from "./components/songs-add/songs-add.component";
import {AlbumsListComponent} from "./components/albums-list/albums-list.component";
import {AlbumsEditComponent} from "./components/albums-edit/albums-edit.component";
import {AlbumsAddComponent} from "./components/albums-add/albums-add.component";
import {ArtistsListComponent} from "./components/artists-list/artists-list.component";
import {ArtistsAddComponent} from "./components/artists-add/artists-add.component";
import {ArtistsEditComponent} from "./components/artists-edit/artists-edit.component";
import {UploadMusicComponent} from "./components/upload-music/upload-music.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'songs',
    pathMatch: 'full'
  },{
    path: 'songs',
    component: SongsListComponent
  },{
    path: 'songs/edit/:id',
    component: SongsEditComponent
  },{
    path: 'songs/add',
    component: SongsAddComponent
  },
  {
    path: 'albums',
    component: AlbumsListComponent
  },{
    path: 'albums/edit/:id',
    component: AlbumsEditComponent
  },{
    path: 'albums/add',
    component: AlbumsAddComponent
  },
  {
    path: 'artists',
    component: ArtistsListComponent
  },{
    path: 'artists/edit/:id',
    component: ArtistsEditComponent
  },{
    path: 'artists/add',
    component: ArtistsAddComponent
  },{
    path: 'uploadMusic',
    component: UploadMusicComponent
  },
  {
    path: '**',
    redirectTo: 'series',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
