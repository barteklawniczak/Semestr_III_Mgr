import {Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../services/song.service';
import {SongModel} from '../models/SongModel';
import {MatTableDataSource} from '@angular/material';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'tsp-songs-component',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

    @ViewChild('onlyMySongs') onlyMySongs;

    public songs: Array<SongModel>;
    public mySongs: Array<SongModel>;
    private userId: string;
    public dataSource = new MatTableDataSource(this.songs);

    displayedColumns: string[] = ['title', 'band', 'genre'];

    constructor(private authService: AuthService, private songService: SongService) {}

    ngOnInit(): void {
        this.userId = this.authService.getLoggedUser()._id;
        this.songService.getAllSongs().subscribe((result) => {
            this.songs = result;
            this.dataSource = new MatTableDataSource(this.songs);
            this.mySongs = this.songs.filter(song => song.user === this.userId);
        });
    }

    filterMySongs() {
        if (this.onlyMySongs._checked) {
            this.dataSource = new MatTableDataSource(this.mySongs);
        } else {
            this.dataSource = new MatTableDataSource(this.songs);
        }
    }
}
