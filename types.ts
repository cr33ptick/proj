export interface Login {
  email: string;
  password: string;
}

export interface Register {
  phoneNo: string;
  username: string;
  email: string;
  password: string;
  regNo?: string;
  specilize?: string;
}
export interface TokenData {
  userId: string;
  username: string;
  role: string;
}

export interface Verify {
  verified: boolean;
  id: string;
}

export interface Book {
  userId: string;
  doctorId: string;
  issue: string;
  time: string;
  date: string;
  phoneNo: string;
}
export interface MpesaRequestBody {
  BusinessShortCode: string;
  Password: string;
  Timestamp: string;
  TransactionType: string;
  Amount: string;
  PartyA: string;
  PartyB: string;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
}
export interface Body {
  stkCallback: StkCallback;
}

export interface StkCallback {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  CallbackMetadata: CallbackMetadata;
}

export interface CallbackMetadata {
  Item: Item[];
}

export interface Item {
  Name: string;
  Value: any;
}
export interface MpesaCallbackResponse {
  Body: Body;
}
export interface MpesaAuthResponse {
  access_token: string;
  expires_in: string;
}

export interface PayResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}
