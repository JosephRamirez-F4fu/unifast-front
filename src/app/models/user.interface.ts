export interface UserRequest {
  name: string;
  email: string;
  phoneNumber: string;
  dni: string;
  pin: string;
}

export interface UserResponse {
  name: string;
  email: string;
  phoneNumber: string;
  dni: string;
  hashedPin: string;
  accountID: number;
  creditID: number;
  profileImgPath: string;
  accountType: string;
  debitCardAuthToken: string;
  dailyTransferLimit: number;
  dailyReceptionLimit: number;
  registerDatetime: string;
  accountStatus: string;
}
