import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertService} from '../../services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  falseUserPassword = true;

  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private authenticationService: AuthenticationService,
  private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.loginForm = new FormGroup(
      {
        email: new FormControl({value: ''}, [Validators.required]),
        password: new FormControl({value: ''}, [Validators.required])
      });
  }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // tslint:disable-next-line:typedef
  get f() { // @ts-ignore
    return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    // @ts-ignore
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // @ts-ignore
    this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          this.falseUserPassword = false;
        });
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
