
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService, Customer, Invoice } from '../../services/customer';
import { UsageDisplayComponent } from '../usage-display/usage-display'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, UsageDisplayComponent]
})
export class DashboardComponent implements OnInit {
  customerId: string = '12345'; // ID por defecto para pruebas
  customerData: Customer | null = null;
  invoiceHistory: Invoice[] = [];
  errorMessage: string = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomerData();
    this.loadInvoiceHistory();
  }

  loadCustomerData(): void {
    this.customerService.getCustomerInfo(this.customerId)
      .subscribe({
        next: (data) => {
          this.customerData = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar los datos del cliente. Por favor, intente más tarde.';
          console.error('Error loading customer data:', error);
        }
      });
  }

  loadInvoiceHistory(): void {
    this.customerService.getInvoiceHistory(this.customerId)
      .subscribe({
        next: (data) => {
          this.invoiceHistory = data.invoices;
        },
        error: (error) => {
          console.error('Error loading invoice history:', error);
        }
      });
  }

  refreshData(): void {
    this.loadCustomerData();
    this.loadInvoiceHistory();
  }
}