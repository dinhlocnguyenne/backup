import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
  onSubmit(): void {
    const password = this.loginForm.get('password')!.value;
    const username = this.loginForm.get('email')!.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        this.snackbar.open('Login success', 'Close', { duration: 3000 });
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('');
        } else {
          this.router.navigateByUrl('');
        }
      },
      (error) => {
        this.snackbar.open('Login Failed.', 'ERROR', {
          duration: 3000,
        });
      }
    );
  }
}
