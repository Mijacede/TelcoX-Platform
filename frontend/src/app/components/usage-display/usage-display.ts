import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CustomerService, Usage } from '../../services/customer';

@Component({
  selector: 'app-usage-display',
  imports: [CommonModule], 
  templateUrl: './usage-display.html',
  styleUrl: './usage-display.css'
})
export class UsageDisplayComponent implements OnInit {
  @Input() customerId: string = '';
  usageData: Usage | null = null;
  errorMessage: string = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    if (this.customerId) {
      this.loadUsageData();
    }
  }

  loadUsageData(): void {
    this.customerService.getUsageInfo(this.customerId)
      .subscribe({
        next: (data) => {
          this.usageData = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar los datos de consumo. Por favor, intente más tarde.';
          console.error('Error loading usage data:', error);
        }
      });
  }

  calculatePercentage(used: number, total: number): number {
    return (used / total) * 100;
  }
}