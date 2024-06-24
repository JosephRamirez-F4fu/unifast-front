import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TokenRequest, TokenResponse } from './models/token.interface';
import { UserRequest, UserResponse } from './models/user.interface';
import { CreditResponse } from './models/credit.interface';
import { Router } from '@angular/router';
import {
  TransactionRequest,
  TransactionResponse,
} from './models/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceUnifast {
  private dev = true;
  private url = this.dev
    ? 'http://localhost:5000/api/v1'
    : 'https://app01:5000/api/v1';
  private router = inject(Router);
  user: UserResponse | null = null;
  Transactions: [TransactionResponse] | null = null;
  credit: CreditResponse | null = null;

  constructor() {}

  async getUser(tokenRequest: TokenRequest) {
    const body = new HttpParams()
      .set('username', tokenRequest.username)
      .set('password', tokenRequest.password);

    try {
      const response = await fetch(`${this.url}/auth/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (response.ok) {
        const tokenResponse: TokenResponse = await response.json();
        localStorage.setItem('token', tokenResponse.access_token);
        localStorage.setItem('token_type', tokenResponse.token_type);
      } else {
        throw new Error('Failed to get user token');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(userRequest: UserRequest) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    try {
      const response = await fetch(`${this.url}/account/account/account`, {
        method: 'POST',
        headers,
        body: JSON.stringify(userRequest),
      });

      if (response.ok) {
        const userResponse: UserResponse = await response.json();
        console.log(userResponse);
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getUserInfo(): Promise<UserResponse> {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await fetch(`${this.url}/account/account/account`, {
        method: 'GET',
        headers,
      });
      if (response.ok) {
        const userInfo: UserResponse = await response.json();
        this.user = userInfo;
        this.router.navigate(['/menu']);
        return this.user;
      } else {
        this.router.navigate(['/login']);
        throw new Error('Failed to get user info');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  async getCreditInfo(creditID: number): Promise<CreditResponse> {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await fetch(
        `${this.url}/account/credit/credit/${creditID}`,
        {
          method: 'GET',
          headers,
        }
      );

      if (response.ok) {
        const creditInfo: CreditResponse = await response.json();
        this.credit = creditInfo;
        return creditInfo;
      } else {
        throw new Error('Failed to get credit info');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createTransaction(
    TransactionRequest: TransactionRequest
  ): Promise<TransactionResponse> {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    try {
      const response = await fetch(
        `${this.url}/account/transaction/transaction`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(TransactionRequest),
        }
      );

      if (response.ok) {
        const transactionResponse: TransactionResponse = await response.json();
        this.Transactions
          ? [...this.Transactions, transactionResponse]
          : [transactionResponse];
        return transactionResponse;
      } else {
        throw new Error('Failed to create transaction');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTransaction(): Promise<[TransactionResponse]> {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await fetch(
        `${this.url}/account/transaction/transactions/account`,
        {
          method: 'GET',
          headers,
        }
      );

      if (response.ok) {
        const transactionResponse: [TransactionResponse] =
          await response.json();
        this.Transactions = transactionResponse;
        return transactionResponse;
      } else {
        throw new Error('Failed to get transaction');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAccountByPhoneNumber(phoneNumber: string): Promise<UserResponse> {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await fetch(
        `${this.url}/account/account/account/${phoneNumber}`,
        {
          method: 'GET',
          headers,
        }
      );

      if (response.ok) {
        const account: UserResponse = await response.json();
        return account;
      } else {
        throw new Error('Failed to find account');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
