
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserLoggedModel} from '../models/UserLoggedModel';
import {SongService} from '../services/song.service';
import {MatTableDataSource} from '@angular/material';
import {SongModel} from '../models/SongModel';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'tsp-user-details-component',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    public user: UserLoggedModel;
    public songs: Array<SongModel>;
    public dataSource = new MatTableDataSource(this.songs);
    displayedColumns: string[] = ['title', 'band', 'genre'];

    constructor(private route: ActivatedRoute, private authService: AuthService, private songService: SongService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.authService.getUser(params['id']).subscribe((user) => {
                this.user = user;
            });
            this.songService.getUserSongs(params['id']).subscribe((result) => {
                this.songs = result;
                this.dataSource = new MatTableDataSource(this.songs);
            });
        });

    }
}
