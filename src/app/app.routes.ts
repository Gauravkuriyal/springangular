import { Routes } from '@angular/router';

export const routes: Routes = [
  // ── Public auth ──────────────────────────────────────────────────────────
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/auth/signup/signup.component').then(m => m.SignupComponent)
  },

  // ── Admin auth ───────────────────────────────────────────────────────────
  {
    path: 'admin-login',
    loadComponent: () => import('./components/admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },

  // ── Customer layout ──────────────────────────────────────────────────────
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
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
      }
    ]
  },

  // ── Admin layout ─────────────────────────────────────────────────────────
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/admin/admin-overview/admin-overview.component').then(m => m.AdminOverviewComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./components/admin/admin-customers/admin-customers.component').then(m => m.AdminCustomersComponent)
      },
      {
        path: 'wallets',
        loadComponent: () => import('./components/admin/admin-wallets/admin-wallets.component').then(m => m.AdminWalletsComponent)
      },
      {
        path: 'bank-accounts',
        loadComponent: () => import('./components/admin/admin-bank-accounts/admin-bank-accounts.component').then(m => m.AdminBankAccountsComponent)
      },
      {
        path: 'beneficiaries',
        loadComponent: () => import('./components/admin/admin-beneficiaries/admin-beneficiaries.component').then(m => m.AdminBeneficiariesComponent)
      },
      {
        path: 'bill-payments',
        loadComponent: () => import('./components/admin/admin-bill-payments/admin-bill-payments.component').then(m => m.AdminBillPaymentsComponent)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./components/admin/admin-transactions/admin-transactions.component').then(m => m.AdminTransactionsComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
