import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// Interfaces para los tipos de datos
export interface Customer {
  name: string;
  balance: number;
  data_usage: {
    used: number;
    total: number;
    unit: string;
  };
  minutes_usage: {
    used: number;
    total: number;
    unit: string;
  };
  last_invoice: {
    date: string;
    amount: number;
    status: string;
  };
}

export interface Usage {
  data_usage: {
    used: number;
    total: number;
    unit: string;
  };
  minutes_usage: {
    used: number;
    total: number;
    unit: string;
  };
}

export interface Invoice {
  date: string;
  amount: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {  // ← La CLASE se llama CustomerService
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getCustomerInfo(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customer/${customerId}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getUsageInfo(customerId: string): Observable<Usage> {
    return this.http.get<Usage>(`${this.apiUrl}/usage/${customerId}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getInvoiceHistory(customerId: string): Observable<{invoices: Invoice[]}> {
    return this.http.get<{invoices: Invoice[]}>(`${this.apiUrl}/invoice/${customerId}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}