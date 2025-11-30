export type PersonalDataChange = 'none' | 'Name' | 'Email' | 'Password' | 'Exit-App' | 'DeleteAccount';

export interface BankAccount {
  bank: string;
  accountNumber: string;
}
export interface BankCard {
  accountId: string;
  brand: string;
  lastDigits: string;
}

export interface Contacts {
  email: string;
  phone: string;
}

export interface Identification {
  birthDate: string; // formato: "dd/MM/yyyy"
  name: string;
  surname: string;
  email: string;
  profilePhoto: string;
}

export interface Credentials {
  password: string;
  passwordRepeat: string;
}

export interface User {
  bankAccounts: Record<string, BankAccount>;
  bankCards: Record<string, BankCard>;
  contacts: Contacts;
  createdAt: string; // ISO string
  groupId: string;
  identification: Identification;
}
