import {Component, OnInit} from '@angular/core';
import {SongService} from '../services/song.service';
import {ActivatedRoute} from '@angular/router';
import {SongModel} from '../models/SongModel';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'tsp-song-details-component',
    templateUrl: './song-details.component.html',
    styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

    public song: SongModel;
    public canEdit = false;

    constructor(private route: ActivatedRoute,
                private songService: SongService,
                private authService: AuthService) {}

    ngOnInit(): void {
        this.route.params.subscribe( params => {
            this.songService.getSongById(params['id']).subscribe((song) => {
                this.song = song;
                this.canEdit = this.authService.getLoggedUser()._id === this.song.user;
            });
        });
    }
}
