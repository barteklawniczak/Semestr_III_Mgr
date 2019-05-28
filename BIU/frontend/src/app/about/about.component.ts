
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserLoggedModel} from '../models/UserLoggedModel';
import {SongService} from '../services/song.service';
import {MatTableDataSource} from '@angular/material';
import {SongModel} from '../models/SongModel';

@Component({
  selector: 'tsp-about-component',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public user: UserLoggedModel;
  public songs: Array<SongModel>;
  public dataSource = new MatTableDataSource(this.songs);
  displayedColumns: string[] = ['title', 'band', 'genre'];

  constructor(private authService: AuthService, private songService: SongService) { }

  ngOnInit() {
   this.user = this.authService.getLoggedUser();
    this.songService.getUserSongs(this.user._id).subscribe((result) => {
      this.songs = result;
      this.dataSource = new MatTableDataSource(this.songs);
    });
  }
}
