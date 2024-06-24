import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Router, RouterOutlet } from '@angular/router';
import { ServiceUnifast } from '../../unifast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenRequest } from '../../models/token.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  myform: FormGroup;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServiceUnifast,
    private snackBar: MatSnackBar
  ) {
    this.myform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  controlHasError(controlName: string, errorName: string) {
    return this.myform.controls[controlName].hasError(errorName);
  }
  login() {
    if (this.myform.invalid) {
      return;
    }
    const singUpData: TokenRequest = this.myform.value as TokenRequest;

    this.service
      .getUser(singUpData)
      .then(() => {
        this.showSnackBar('Bienvenido a Unifast');
        this.service.getUserInfo().then((user) => {});
      })
      .catch(() => {
        this.showSnackBar('Usuario o contraseña incorrectos');
      });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }
}
