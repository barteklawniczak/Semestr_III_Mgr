import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {SongService} from '../services/song.service';
import {MatTableDataSource} from '@angular/material';
import {UserLoggedModel} from '../models/UserLoggedModel';

@Component({
    selector: 'tsp-users-component',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public users: Array<UserLoggedModel>;
    public dataSource = new MatTableDataSource(this.users);
    displayedColumns: string[] = ['login', 'email'];

    constructor(private authService: AuthService, private songService: SongService) {}

    ngOnInit(): void {
        this.authService.getUsers().subscribe((response) => {
            this.users = response;
            this.dataSource = new MatTableDataSource(this.users);
        }, (error) => {
            console.log(error);
        });
    }
}
