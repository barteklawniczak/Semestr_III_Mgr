import {Component, OnInit} from '@angular/core';
import {SongService} from '../services/song.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'tsp-new-song-component',
    templateUrl: './new-song.component.html',
    styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {

    newSongForm = new FormGroup({
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
                private router: Router) {}

    ngOnInit(): void {
        this.newSongForm.controls['user'].setValue(this.authService.getLoggedUser()._id);
    }

    onSubmit() {
        if (!this.newSongForm.valid) { return; }
        this.newSongForm.controls['videoURL'].setValue(this.newSongForm.controls['videoURL'].value.toString()
            .replace('watch?v=', 'embed/'));
        this.songService.addNewSong(this.newSongForm.value).subscribe((response) => {
            this.toastr.success( 'Song added!', 'Success!');
            this.router.navigate(['/songs']);
        }, (error) => {
            this.toastr.error( 'Error occured!', 'Error!');
        });
    }

    get band() {
        return this.newSongForm.get('band');
    }

    get title() {
        return this.newSongForm.get('title');
    }

    get lyrics() {
        return this.newSongForm.get('lyrics');
    }
}
