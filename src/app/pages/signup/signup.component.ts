import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Router, RouterOutlet } from '@angular/router';
import { ServiceUnifast } from '../../unifast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRequest } from '../../models/user.interface';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private router: Router = inject(Router);
  private service: ServiceUnifast = inject(ServiceUnifast);

  myform: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.myform = this.fb.group({
      name: ['', Validators.required],
      pin: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      dni: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  controlHasError(controlName: string, errorName: string) {
    return this.myform.controls[controlName].hasError(errorName);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  signUp() {
    if (this.myform.invalid) {
      return;
    }
    const singUpData: UserRequest = this.myform.value as UserRequest;

    this.service
      .createUser(singUpData)
      .then(() => {
        this.showSnackBar('Bienvenido a Unifast');
        this.router.navigate(['/login']);
      })
      .catch(() => {
        this.showSnackBar('Error al realizar el registro');
      });
  }
}
