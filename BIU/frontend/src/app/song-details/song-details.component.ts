import {Component, OnInit} from '@angular/core';
import {SongService} from '../services/song.service';
import {ActivatedRoute} from '@angular/router';
import {SongModel} from '../models/SongModel';
import {AuthService} from '../auth/auth.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import {EditSongComponent} from '../edit-song/edit-song.component';

@Component({
    selector: 'tsp-song-details-component',
    templateUrl: './song-details.component.html',
    styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

    public song: SongModel;
    public canEdit = false;
    public safeUrl: SafeResourceUrl;

    constructor(private route: ActivatedRoute,
                private songService: SongService,
                private authService: AuthService,
                private sanitizer: DomSanitizer,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.songService.getSongById(params['id']).subscribe((song) => {
                this.song = song;
                this.canEdit = this.authService.getLoggedUser()._id === this.song.user;
                this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.song.videoURL);
            });
        });
    }

    openEditDialog() {
        this.dialog.open(EditSongComponent, {
            width: '700px',
            data: {
                song: this.song
            }
        });
    }
}
