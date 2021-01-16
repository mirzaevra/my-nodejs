import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MaterialService} from '../shared/classes/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  protected subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    this.form.disable();
    this.subscription = this.authService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        });
      },
      error: (error) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    });
  }

}
