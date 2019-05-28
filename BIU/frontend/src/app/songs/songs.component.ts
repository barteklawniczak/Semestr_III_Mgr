import {Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../services/song.service';
import {SongModel} from '../models/SongModel';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'tsp-songs-component',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

    @ViewChild('onlyMySongs') onlyMySongs;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public songs: Array<SongModel>;
    public mySongs: Array<SongModel>;
    public userId: string;
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
        if (this.authService.checkCredentials()) {
            this.userId = this.authService.getLoggedUser()._id;
        }
        this.songService.getAllSongs().subscribe((result) => {
            this.songs = result;
            this.dataSource = new MatTableDataSource(this.songs);
            this.dataSource.paginator = this.paginator;
            if (this.userId) {
                this.mySongs = this.songs.filter(song => song.user === this.userId);
            }
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
        let dataSongs = this.songs;
        if (this.userId && this.onlyMySongs._checked) {
            dataSongs = this.mySongs;
        }
        if (this.currentBand) {
            dataSongs = dataSongs.filter(song => song.band === this.currentBand);
        }
        if (this.currentGenre) {
            dataSongs = dataSongs.filter(song => song.genre === this.currentGenre);
        }
        this.dataSource = new MatTableDataSource(dataSongs);
        this.dataSource.paginator = this.paginator;
    }

    sortBand() {
        this.dataSource = new MatTableDataSource(this.dataSource.filteredData.sort((n1, n2) => {
            if (n1.band > n2.band) {
                return 1;
            }
            if (n1.band < n2.band) {
                return -1;
            }
            return 0;
        }));
        this.dataSource.paginator = this.paginator;
    }

    sortGenre() {
        this.dataSource = new MatTableDataSource(this.dataSource.filteredData.sort((n1, n2) => {
            if (n1.genre > n2.genre) {
                return 1;
            }
            if (n1.genre < n2.genre) {
                return -1;
            }
            return 0;
        }));
        this.dataSource.paginator = this.paginator;
    }

}
