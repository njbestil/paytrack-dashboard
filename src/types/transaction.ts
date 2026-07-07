export type PaymentStatus = "success" | "pending" | "failed";

export type PaymentMethod = "card" | "cash" | "wallet";

export type UserRole = "admin" | "merchant" | "support";

export interface Transaction {
  id: string;
  merchantName: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  date: string;
  referenceNumber: string;
  userRole: UserRole;
}
