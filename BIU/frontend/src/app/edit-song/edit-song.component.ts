import {Component, Inject, OnInit} from '@angular/core';
import {SongService} from '../services/song.service';
import {AuthService} from '../auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'tsp-edit-song-dialog',
    templateUrl: 'edit-song.component.html',
    styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {

    public updateSongForm = new FormGroup({
        _id: new FormControl(''),
        band: new FormControl(''),
        genre: new FormControl(''),
        title: new FormControl(''),
        videoURL: new FormControl(''),
        lyrics: new FormControl(''),
        user: new FormControl('')
    });

    constructor(private songService: SongService,
                private authService: AuthService,
                private toastr: ToastrService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.updateSongForm.setValue({
            _id: this.data.song._id,
            band: this.data.song.band,
            genre: this.data.song.genre,
            title: this.data.song.title,
            videoURL: this.data.song.videoURL,
            lyrics: this.data.song.lyrics,
            user: this.data.song.user
        });
    }

    onSubmit() {
        if (this.updateSongForm.controls['videoURL'].value.toString().includes('watch?v=')) {
            this.updateSongForm.controls['videoURL'].setValue(this.updateSongForm.controls['videoURL'].value.toString()
                .replace('watch?v=', 'embed/'));
        }
        this.songService.updateSong(this.updateSongForm.value).subscribe((response) => {
            this.toastr.success( 'Song updated!', 'Success!');
        }, (error) => {
            this.toastr.error( 'Error occured!', 'Error!');
        });
    }
}
