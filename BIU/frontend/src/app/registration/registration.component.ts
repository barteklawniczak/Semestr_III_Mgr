
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

function passwordConfirmValidation(c: AbstractControl): any {
  if (!c.parent || !c) {
    return;
  }
  if (c.parent.get('password').value !== c.value) {
    return { invalid: true };
  }
}

@Component({
  selector: 'tsp-registration-component',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  registrationForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatedPassword: new FormControl('', [Validators.required, passwordConfirmValidation])
  });

  ngOnInit() { }

  onSubmit() {
    if (!this.registrationForm.valid) { return; }
    this.authService.registration(this.registrationForm.value).subscribe(
      (res) => {
        this.toastr.success( 'Registration successful! Please wait, you are being autologged.', 'Success!');
        setTimeout(() => {
          this.authService.obtainAccessToken(new FormGroup({
            login: this.registrationForm.controls['login'],
            password: this.registrationForm.controls['password']}).value);
          }, 3000);
    }, (error) => {
        this.toastr.error( 'Registration unsuccessful! Please check your form.', 'Error!');
      });
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get login() {
    return this.registrationForm.get('login');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get repeatedPassword() {
    return this.registrationForm.get('repeatedPassword');
  }
}
