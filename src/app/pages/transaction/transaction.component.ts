import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterOutlet } from '@angular/router';
import { ServiceUnifast } from '../../unifast.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { TransactionRequest } from '../../models/transaction.interface';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionComponent {
  form: FormGroup;
  constructor(
    private service: ServiceUnifast,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      subjectAccountPhoneNumber: ['', Validators.required],
      amount: ['', Validators.required],
      transactionType: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  controlHasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  makeTransaction() {
    if (this.form.invalid) {
      return;
    }
    const transactionData: TransactionRequest = this.form
      .value as TransactionRequest;

    this.service
      .createTransaction(transactionData)
      .then(() => {
        this.showSnackBar('Transacción realizada con éxito');
        delay(2000);
        this.router.navigate(['/menu']);
      })
      .catch(() => {
        this.showSnackBar('Error al realizar la transacción');
      });
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }
  closeSession() {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
