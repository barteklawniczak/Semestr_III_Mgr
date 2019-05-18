import {Component, OnInit} from '@angular/core';
import {SongService} from '../services/song.service';
import {SongModel} from '../models/SongModel';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'tsp-songs-component',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

    public songs: Array<SongModel>;
    public dataSource = new MatTableDataSource(this.songs);
    displayedColumns: string[] = ['title', 'band', 'genre'];

    constructor(private songService: SongService) {}

    ngOnInit(): void {
        this.songService.getAllSongs().subscribe((result) => {
            this.songs = result;
            this.dataSource = new MatTableDataSource(this.songs);
        });
    }

}
