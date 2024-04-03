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
