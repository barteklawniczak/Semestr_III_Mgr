import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SongService} from './services/song.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about/about.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AuthGuard} from './utils/AuthGuard';
import {CookieService} from 'ngx-cookie-service';
import {Interceptor} from './auth/auth.interceptor';
import {RegistrationComponent} from './registration/registration.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ToastrModule} from 'ngx-toastr';
import {SongsComponent} from './songs/songs.component';
import {SongDetailsComponent} from './song-details/song-details.component';
import {NewSongComponent} from './new-song/new-song.component';
import {EditSongComponent} from './edit-song/edit-song.component';
import {UsersComponent} from './users/users.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'

@NgModule(<NgModule>{
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AboutComponent,
    RegistrationComponent,
    EditSongComponent,
    SongsComponent,
    SongDetailsComponent,
    NewSongComponent,
    UsersComponent,
    UserDetailsComponent
  ],
  entryComponents: [
    EditSongComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ToastrModule.forRoot(),
    LeafletModule.forRoot(),
    ChartsModule,
    WavesModule
  ],
  providers: [SongService, AuthGuard, CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
