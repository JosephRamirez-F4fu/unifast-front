import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'signup', component: SignupComponent },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
];
