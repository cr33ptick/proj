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
}
