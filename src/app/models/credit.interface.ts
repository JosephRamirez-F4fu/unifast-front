export interface CreditResponse {
  creditID: number;
  ownedCredit: number;
  preApprovedRequest: boolean;
  prevInstallmentOverdue: boolean;
  creditEligibility: boolean;
}
