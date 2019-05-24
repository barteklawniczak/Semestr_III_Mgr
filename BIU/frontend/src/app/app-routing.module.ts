import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './utils/AuthGuard';
import {RegistrationComponent} from './registration/registration.component';
import {SongsComponent} from './songs/songs.component';
import {SongDetailsComponent} from './song-details/song-details.component';
import {NewSongComponent} from './new-song/new-song.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'songs',
    component: SongsComponent
  },
  {
    path: 'songs/:id',
    component: SongDetailsComponent
  },
  {
    path: 'new-song',
    component: NewSongComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
