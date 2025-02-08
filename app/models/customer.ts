export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  address: string;
  amount: number;
  date: Date;
  frontIdImage?: string;
  backIdImage?: string;
}