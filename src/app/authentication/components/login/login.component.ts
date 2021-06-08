import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { LibraryConfig } from '../../models/config';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error?: string | null;

  constructor(private authenticationService: AuthenticationService, private router: Router, @Inject('config') private config: LibraryConfig) {    
      this.loginForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      })
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user = this.loginForm.value;
    this.authenticationService.login(user)
      .pipe(first())
      .subscribe(data => this.router.navigate([this.config.initialPage]), error => this.error = error);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
      return control ? control.touched && control.invalid : true;
  }

}
