export interface TransactionRequest {
  subjectAccountPhoneNumber: string;
  amount: number;
  transactionType: string;
  message: string;
}
export interface TransactionResponse {
  transactionID: number;
  accountID: number;
  subjectAccountID: number;
  subjectSupplierID: number | null;
  realizationDatetime: string;
  amount: number;
  transactionType: string;
  message: string | null;
  eBill: string;
  eBillSign: string;
}
