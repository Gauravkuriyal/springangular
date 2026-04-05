export type BillType = 'ELECTRICITY' | 'MOBILE_RECHARGE' | 'GAS_BOOKING';

export interface BillPaymentRequest {
  amount: number;
  billType: BillType;
  billData: Record<string, string>;
}

export interface BillPaymentResponse {
  billId: number;
  paymentDate: string;
  amount: number;
  billType: BillType;
  billData: Record<string, string>;
}

export interface BillPaymentResult {
  status: string;
  message: string;
  timestamp: number;
}
