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
    public bands: string[] = [];
    public genres: string[] = [];
    private currentBand = '';
    private currentGenre = '';

    displayedColumns: string[] = ['title', 'band', 'genre'];

    constructor(private authService: AuthService, private songService: SongService) {}

    ngOnInit(): void {
        this.bands.push('all');
        this.genres.push('all');
        this.userId = this.authService.getLoggedUser()._id;
        this.songService.getAllSongs().subscribe((result) => {
            this.songs = result;
            this.dataSource = new MatTableDataSource(this.songs);
            this.mySongs = this.songs.filter(song => song.user === this.userId);
            this.bands.push(...[...result.map(song => song.band)].filter((x, i, a) => a.indexOf(x) === i));
            this.genres.push(...[...result.map(song => song.genre)].filter((x, i, a) => a.indexOf(x) === i));
        });
    }

    filterWithBand(value) {
        if (value !== 'all') {
            this.currentBand = value;
        } else {
            this.currentBand = '';
        }
        this.filterDataSource();
    }

    filterWithGenre(value) {
        if (value !== 'all') {
            this.currentGenre = value;
        } else {
            this.currentGenre = '';
        }
        this.filterDataSource();
    }

    filterDataSource() {
        let dataSongs;
        if (this.onlyMySongs._checked) {
            dataSongs = this.mySongs;
        } else {
            dataSongs = this.songs;
        }
        if (this.currentBand) {
            dataSongs = dataSongs.filter(song => song.band === this.currentBand);
        }
        if (this.currentGenre) {
            dataSongs = dataSongs.filter(song => song.genre === this.currentGenre);
        }
        this.dataSource = new MatTableDataSource(dataSongs);
    }
}
