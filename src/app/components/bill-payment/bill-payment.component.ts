import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillPaymentService } from '../../services/bill-payment.service';
import { BillPaymentResponse, BillType } from '../../models/bill-payment.model';

@Component({
  selector: 'app-bill-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bill-payment.component.html'
})
export class BillPaymentComponent implements OnInit {
  bills: BillPaymentResponse[] = [];
  loading = true;
  error = '';
  successMsg = '';
  showForm = false;

  billTypes: BillType[] = ['ELECTRICITY', 'MOBILE_RECHARGE', 'GAS_BOOKING'];

  form = {
    amount: 0,
    billType: 'ELECTRICITY' as BillType,
    billDataKey: '',
    billDataValue: ''
  };

  constructor(private billService: BillPaymentService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.billService.getAll().subscribe({
      next: (data) => { this.bills = data; this.loading = false; },
      error: () => { this.error = 'Failed to load bills.'; this.loading = false; }
    });
  }

  createBill() {
    const billData: Record<string, string> = {};
    if (this.form.billDataKey) billData[this.form.billDataKey] = this.form.billDataValue;

    this.billService.create({
      amount: this.form.amount,
      billType: this.form.billType,
      billData
    }).subscribe({
      next: (res) => {
        this.successMsg = res.message;
        this.showForm = false;
        this.form = { amount: 0, billType: 'ELECTRICITY', billDataKey: '', billDataValue: '' };
        this.load();
      },
      error: () => { this.error = 'Failed to create bill payment.'; }
    });
  }

  deleteBill(id: number) {
    if (!confirm('Delete this bill?')) return;
    this.billService.delete(id).subscribe({
      next: (msg) => { this.successMsg = msg; this.load(); },
      error: () => { this.error = 'Failed to delete bill.'; }
    });
  }
}
