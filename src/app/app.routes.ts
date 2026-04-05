import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/auth/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'wallet',
    loadComponent: () => import('./components/wallet/wallet.component').then(m => m.WalletComponent)
  },
  {
    path: 'bank-account',
    loadComponent: () => import('./components/bank-account/bank-account.component').then(m => m.BankAccountComponent)
  },
  {
    path: 'beneficiary',
    loadComponent: () => import('./components/beneficiary/beneficiary.component').then(m => m.BeneficiaryComponent)
  },
  {
    path: 'bill-payment',
    loadComponent: () => import('./components/bill-payment/bill-payment.component').then(m => m.BillPaymentComponent)
  },
  {
    path: 'transactions',
    loadComponent: () => import('./components/transaction/transaction.component').then(m => m.TransactionComponent)
  },
  { path: '**', redirectTo: 'login' }
];
