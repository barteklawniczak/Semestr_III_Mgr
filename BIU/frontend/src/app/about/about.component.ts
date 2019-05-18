
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserLoggedModel} from '../models/UserLoggedModel';

@Component({
  selector: 'tsp-about-component',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public user: UserLoggedModel;

  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.user = this.authService.getLoggedUser();
  }
}
