import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionCategory } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  filtered: Transaction[] = [];
  loading = true;
  error = '';
  successMsg = '';

  filterCategory = '';
  filterFrom = '';
  filterTo = '';

  categories: TransactionCategory[] = ['BENEFICIARY_TRANSFER', 'BILL_PAYMENT', 'WALLET_TOP_UP'];

  constructor(private txService: TransactionService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.txService.getAll().subscribe({
      next: (data) => {
        this.transactions = data;
        this.filtered = data;
        this.loading = false;
      },
      error: () => { this.error = 'Failed to load transactions.'; this.loading = false; }
    });
  }

  applyFilter() {
    if (this.filterCategory) {
      this.txService.getByCategory(this.filterCategory as TransactionCategory).subscribe({
        next: (data) => { this.filtered = data; },
        error: () => { this.error = 'Filter failed.'; }
      });
    } else if (this.filterFrom && this.filterTo) {
      this.txService.getByDateRange(this.filterFrom, this.filterTo).subscribe({
        next: (data) => { this.filtered = data; },
        error: () => { this.error = 'Filter failed.'; }
      });
    } else {
      this.filtered = this.transactions;
    }
  }

  clearFilter() {
    this.filterCategory = '';
    this.filterFrom = '';
    this.filterTo = '';
    this.filtered = this.transactions;
  }

  deleteTransaction(id: number) {
    if (!confirm('Delete this transaction?')) return;
    this.txService.delete(id).subscribe({
      next: (msg) => { this.successMsg = msg; this.load(); },
      error: () => { this.error = 'Failed to delete.'; }
    });
  }

  badgeColor(type: string): string {
    if (type === 'DEBIT') return 'bg-red-50 text-red-500';
    if (type === 'CREDIT') return 'bg-green-50 text-green-600';
    return 'bg-gray-100 text-gray-500';
  }
}
