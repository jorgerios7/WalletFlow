import { Group } from "./Group";

export type PersonalDataChange = 'none' | 'name' | 'email' | 'password' | 'exit-app' | 'deleteAccount';
export type UserGroupState = "none" | "hasAGroup" | "createGroup";

export interface BankAccount {
  bank: string;
  accountNumber: string;
};

export interface BankCard {
  accountId: string;
  brand: string;
  lastDigits: string;
};

export interface Contacts {
  email: string;
  phone: string;
};

export interface Identification {
  birthDate: string; // formato: "dd/MM/yyyy"
  name: string;
  surname: string;
  email: string;
  profilePhoto: string;
};

export interface Credentials {
  password: string;
  passwordRepeat: string;
};

export interface User {
  bankAccounts: Record<string, BankAccount>;
  bankCards: Record<string, BankCard>;
  contacts: Contacts;
  createdAt: string; // ISO string
  groupId: string;
  identification: Identification;
};

export interface UserLogin {
  firstName: string;
  surname: string;
  email: string;
  birthDate: string;
  password: string;
  passwordRepeat: string
};

export interface UpdateUsernameProps {
  groupId: string,
  newName: string,
  newSurname: string
};

export interface UpdateEmailProps {
  currentPassword: string,
  newEmail: string,
  repeatNewEmail: string
};

export interface UpdatePasswordProps {
  currentPassword: string,
  newPassword: string,
  repeatNewPassword: string
};

export interface UserContextData {
  user: User | null;
  group: Group | null;
  userId: string | null;
  userHasGroup: boolean;
  loadingUserAndGroup: boolean;
  profilePhotoUri: string | null;
  loadingAuth: boolean;
  authenticated: boolean;
  error: unknown | null;
  updateUserName: (value: UpdateUsernameProps) => Promise<void>;
  updateEmail: (value: UpdateEmailProps) => Promise<void>;
  updatePassword: (value: UpdatePasswordProps) => Promise<void>;
  loadProfilePhoto: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const UpdateEmailDefault = {
  currentPassword: "",
  newEmail: "",
  repeatNewEmail: ""
};

export const UserNameDefault = {
  groupId: "",
  newNname: "",
  newSurname: ""
};

export const UpdatePasswordDefault = {
  currentPassword: "",
  newPassword: "",
  repeatNewPassword: ""
};
