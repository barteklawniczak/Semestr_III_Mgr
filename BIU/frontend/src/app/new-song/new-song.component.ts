import {Component, OnInit} from '@angular/core';
import {SongService} from '../services/song.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'tsp-new-song-component',
    templateUrl: './new-song.component.html',
    styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {

    newSongForm = new FormGroup({
        band: new FormControl(''),
        genre: new FormControl(''),
        title: new FormControl(''),
        videoURL: new FormControl(''),
        lyrics: new FormControl(''),
        user: new FormControl('')
    });

    constructor(private songService: SongService,
                private authService: AuthService,
                private toastr: ToastrService) {}

    ngOnInit(): void {
        this.newSongForm.controls['user'].setValue(this.authService.getLoggedUser()._id);
    }

    onSubmit() {
        this.newSongForm.controls['videoURL'].setValue(this.newSongForm.controls['videoURL'].value.toString()
            .replace('watch?v=', 'embed/'));
        this.songService.addNewSong(this.newSongForm.value).subscribe((response) => {
            this.toastr.success( 'Song added!', 'Success!');
        }, (error) => {
            this.toastr.error( 'Error occured!', 'Error!');
        });
    }
}
