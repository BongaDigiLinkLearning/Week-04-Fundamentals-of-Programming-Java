import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { InternService } from '../../service/intern.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Intern } from '../../models/intern';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent
{
  constructor(
    private fb : FormBuilder,
    private service: InternService,
    private router: Router,
    private authService: AuthService,
  ) {}

  initForm(): FormGroup
  {
    let form =  this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  return form
}


  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })


  public login(): void
  {
    const body = {
      email: this.form.value.email,
      password: this.form.value.password};

    // console.log("Form inputs : "+ body)
    // this.authService.signin(body).subscribe({
    //   next: () => {
    //     this.router.navigateByUrl('/dashboard');
    //   },
    //   error: ({ error }) => {
    //     if (error.username || error.password) {
    //       this.form.setErrors({ credentials: true });
    //     }
    //   }
    // })

    this.service.loginIntern(body).subscribe(
      (response: Intern) =>
      {
        //console.log("Logged in user status : "+response.activeStatus)
        sessionStorage.setItem('user_email',`${response.email}`)
        sessionStorage.setItem('user_id',`${response.id}`)

        this.router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      }
    )

  }
}
