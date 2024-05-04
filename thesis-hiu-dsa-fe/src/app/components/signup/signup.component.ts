import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  onSubmit(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.snackbar.open('Password do not match.', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar',
      });
      return;
    }
    console.log('>>>>>>>', this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackbar.open('Sign Up successfully', 'Close', { duration: 3000 });
        this.router.navigateByUrl('/login');
      },
      (error) => {
        this.snackbar.open('Sign Up failed. Please try again', 'Close', {
          duration: 3000,
          panelClass: 'error-snackbar',
        });
      }
    );
  }
}
