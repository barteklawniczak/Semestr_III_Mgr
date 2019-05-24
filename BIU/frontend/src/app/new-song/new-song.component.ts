import {Component, OnInit} from '@angular/core';
import {SongService} from '../services/song.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../auth/auth.service';

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
        user: new FormControl('')
    });

    constructor(private songService: SongService, private authService: AuthService) {}

    ngOnInit(): void {
        this.newSongForm.controls['user'].setValue(this.authService.getLoggedUser()._id);
    }

    onSubmit() {
        this.songService.addNewSong(this.newSongForm.value).subscribe((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }
}
