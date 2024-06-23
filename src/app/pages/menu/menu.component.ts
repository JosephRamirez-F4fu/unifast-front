import { Component, Signal, inject, computed, NgZone } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MaterialModule } from '../../material/material.module';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ServiceUnifast } from '../../unifast.service';
import { UserResponse } from '../../models/user.interface';
import { CreditResponse } from '../../models/credit.interface';
import { TransactionResponse } from '../../models/transaction.interface';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  user: UserResponse | null = null;
  credit: CreditResponse | null = null;
  transactions: TransactionResponse[] = [];
  constructor(
    private service: ServiceUnifast,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.service.getUserInfo().then((user) => {
      this.user = user;
      this.cdr.markForCheck();
      if (user) {
        this.service.getCreditInfo(user.creditID).then((credit) => {
          this.credit = credit;
          this.cdr.markForCheck();
        });
        if (user) {
          this.service.getTransaction().then((transactions) => {
            this.transactions = transactions;
            this.cdr.markForCheck();
          });
        }
      }
    });
  }

  fancyTransactionDate(dateString: string | undefined): string {
    if (!dateString) {
      return '';
    }
    let date = new Date(dateString);

    // Obtener el día, mes y año
    let day = date.getDate();
    let month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexados
    let year = date.getFullYear();

    // Formatear el día y el mes con dos dígitos
    let day_str = day < 10 ? '0' + String(day) : String(day);
    let month_str = month < 10 ? '0' + String(month) : String(month);

    // Construir el string con el formato deseado
    let formattedDate = day_str + '/' + month_str + '/' + year;

    return formattedDate;
  }

  goToTransaction() {
    this.router.navigate(['/transaction']);
  }
  closeSession() {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
