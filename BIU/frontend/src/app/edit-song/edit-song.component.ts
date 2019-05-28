import {Component, Inject, OnInit} from '@angular/core';
import {SongService} from '../services/song.service';
import {AuthService} from '../auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'tsp-edit-song-dialog',
    templateUrl: 'edit-song.component.html',
    styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {

    public updateSongForm = new FormGroup({
        _id: new FormControl(''),
        band: new FormControl('', [Validators.required]),
        genre: new FormControl(''),
        title: new FormControl('', [Validators.required]),
        videoURL: new FormControl(''),
        lyrics: new FormControl('', [Validators.required]),
        user: new FormControl('')
    });

    constructor(private songService: SongService,
                private authService: AuthService,
                private toastr: ToastrService,
                private router: Router,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.updateSongForm.setValue({
            _id: this.data.song._id,
            band: this.data.song.band,
            genre: this.data.song.genre ? this.data.song.genre : '',
            title: this.data.song.title ? this.data.song.title : '',
            videoURL: this.data.song.videoURL ? this.data.song.videoURL : '',
            lyrics: this.data.song.lyrics ? this.data.song.lyrics : '',
            user: this.data.song.user
        });
    }

    onSubmit() {
        if (!this.updateSongForm.valid) { return; }
        if (this.updateSongForm.controls['videoURL'].value.toString().includes('watch?v=')) {
            this.updateSongForm.controls['videoURL'].setValue(this.updateSongForm.controls['videoURL'].value.toString()
                .replace('watch?v=', 'embed/'));
        }
        this.songService.updateSong(this.updateSongForm.value).subscribe((response) => {
            this.toastr.success( 'Song updated!', 'Success!');
            this.router.navigate(['/songs']);
            this.dialog.closeAll();
        }, (error) => {
            this.toastr.error( 'Error occured!', 'Error!');
        });
    }

    get band() {
        return this.updateSongForm.get('band');
    }

    get title() {
        return this.updateSongForm.get('title');
    }

    get lyrics() {
        return this.updateSongForm.get('lyrics');
    }
}
