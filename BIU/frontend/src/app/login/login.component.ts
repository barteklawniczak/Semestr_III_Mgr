
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SongService} from '../services/song.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'tsp-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  returnUrl: string;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.authService.obtainAccessToken(this.loginForm.value);
  }

}
