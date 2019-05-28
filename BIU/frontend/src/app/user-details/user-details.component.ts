
import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserLoggedModel} from '../models/UserLoggedModel';
import {SongService} from '../services/song.service';
import {MatTableDataSource} from '@angular/material';
import {SongModel} from '../models/SongModel';
import {ActivatedRoute} from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';

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

    public chartType = 'pie';
    public chartDatasets: Array<any> = [
        { data: [], label: 'Bands' }
    ];
    public chartLabels: Array<any>;
    public chartColors: Array<any> = [
        {
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
            borderWidth: 2,
        }
    ];
    public chartOptions: any = {
        responsive: true
    };

    constructor(private route: ActivatedRoute, private authService: AuthService, private songService: SongService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.authService.getUser(params['id']).subscribe((user) => {
                this.user = user;
            });
            this.songService.getUserSongs(params['id']).subscribe((result) => {
                this.songs = result;
                this.dataSource = new MatTableDataSource(this.songs);
                const bandsNames = [];
                bandsNames.push(...[...result.map(song => song.band)].filter((x, i, a) => a.indexOf(x) === i));
                this.chartLabels = [];
                bandsNames.forEach((bandName) => {
                    this.chartLabels.push(bandName);
                    this.chartDatasets[0].data.push(this.songs.filter(song => song.band === bandName).length);
                });
            });
        });
    }

    public chartClicked(): void { }
    public chartHovered(): void { }
}
