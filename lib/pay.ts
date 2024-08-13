import { MpesaAuthResponse, MpesaRequestBody, PayResponse } from "@/types";
import axios from "axios";

export async function createToken() {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const key = process.env.MPESA_KEY;
  const secret = process.env.MPESA_SECRET;
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  const response = await axios.get(url, {
    headers: {
      authorization: `Basic ${auth}`,
    },
  });
  const data = await response.data;
  return data.access_token;
}

export async function makePayment(
  phoneNo: string,
  amount: string,
  callbackUrl: string
): Promise<PayResponse> {
  const shortcode = 174379;
  const passkey = process.env.MPESA_PASS_KEY!;
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const password = Buffer.from(shortcode + passkey + timestamp).toString(
    "base64"
  );

  const token = await createToken();

  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const body: MpesaRequestBody = {
    BusinessShortCode: "174379",
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNo,
    PartyB: "174379",
    PhoneNumber: phoneNo,
    CallBackURL: callbackUrl,
    AccountReference: "174379",
    TransactionDesc: "Place order",
  };
  const response = await axios.post(url, body, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data: PayResponse = await response.data;
  return data;
}
