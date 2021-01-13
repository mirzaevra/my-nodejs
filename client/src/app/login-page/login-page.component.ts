import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  protected subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe({
      next: (params: Params) => {
        if (params['registered']) {
          // Вы зарегались
        } else if (params['accesDenied']) {
          // Авторизуйтесь
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    // Тоже самое
    // const {email, password} = this.form.value;
    // const user = {
    //   email,
    //   password
    // };

    this.form.disable();
    this.subscription = this.authService.login(this.form.value).subscribe(
      {
        next: () => this.router.navigate(['/overview']),
        error: error => {
          console.error(error);
          this.form.enable();
        }
      }
    );
  }

}
