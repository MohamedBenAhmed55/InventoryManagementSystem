// Import necessary Angular modules and services
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';

// Define the component metadata
@Component({
  selector: 'app-dashboard', 
  standalone: true, 
  imports: [CommonModule, NgxChartsModule, FormsModule], 
  templateUrl: './dashboard.component.html', 
  styleUrl: './dashboard.component.css', 
})

export class DashboardComponent {
  // Define the properties for storing transaction data and chart data
  transactions: any[] = []; // Array to hold all transactions
  transactionTypeData: any[] = []; // Data for the chart showing count of transactions by type
  transactionAmountData: any[] = []; // Data for the chart showing total amount by transaction type
  monthlyTransactionData: any[] = []; // Data for the chart showing daily totals for the selected month

  // List of months, used for selecting a month
  months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
  ];

  // Array to store the years (last 10 years from current year)
  years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i); 

  // Selected month and year for filtering monthly data
  selectedMonth = '';
  selectedYear = '';

  // Chart view dimensions, legend, and animations settings
  view: [number, number] = [700, 400];  // Chart size: width x height
  showLegend = true;  // Display chart legend
  showLabels = true;  // Display labels on chart
  animations = true;  // Enable chart animations

  // Constructor to inject ApiService for API calls
  constructor(private apiService: ApiService) {}

  // ngOnInit lifecycle hook, called when the component initializes
  ngOnInit(): void {
    this.loadTransactions(); // Load transactions when the component initializes
  }

  // Method to fetch all transactions from the API
  loadTransactions(): void {
    this.apiService.getAllTransactions('').subscribe((data) => {
      this.transactions = data.transactions;
      this.processChartData();
    });
  }

  // Method to process transaction data for type-based and amount-based charts
  processChartData(): void {
    // Object to count the number of transactions by type
    const typeCounts: { [key: string]: number } = {};

    // Object to sum the transaction amounts by type
    const amountByType: { [key: string]: number } = {};

    // Loop through each transaction to calculate totals by type
    this.transactions.forEach((transaction) => {
      const type = transaction.transactionType;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
      amountByType[type] = (amountByType[type] || 0) + transaction.totalPrice;
    });

    // Prepare data for chart displaying number of transactions by type
    this.transactionTypeData = Object.keys(typeCounts).map((type) => ({
      name: type,
      value: typeCounts[type],
    }));

    // Prepare data for chart displaying total transaction amount by type
    this.transactionAmountData = Object.keys(amountByType).map((type) => ({
      name: type,
      value: amountByType[type],
    }));
  }

  // Method to load transaction data for a specific month and year
  loadMonthlyData(): void {
    if (!this.selectedMonth || !this.selectedYear) {
      return;
    }

    this.apiService
      .getTransactionsByMonthAndYear(
        Number.parseInt(this.selectedMonth),
        Number.parseInt(this.selectedYear)
      )
      .subscribe((data) => {
        this.transactions = data.transactions; 
        this.processChartData();
        this.processMonthlyData(data.transactions);
      });
  }

  // Method to process daily transaction data for the selected month
  processMonthlyData(transactions: any[]): void {
    const dailyTotals: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt).getDate().toString(); 
      dailyTotals[date] = (dailyTotals[date] || 0) + transaction.totalPrice;
    });

    this.monthlyTransactionData = Object.keys(dailyTotals).map((day) => ({
      name: `Day ${day}`,
      value: dailyTotals[day],
    }));
  }
}