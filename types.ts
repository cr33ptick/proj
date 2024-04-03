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
  role: boolean;
}

export interface Verify {
  verified: boolean;
  id: string;
}
