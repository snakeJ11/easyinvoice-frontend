export type Item = {
  description: string;
  quantity: number;
  unitPrice: number;
  total?: number; // Total can be calculated, so it's optional
};


export type Invoice = {
  userId?: string;
  clientId: Client | string; // Client can be an object or just an ID
  items: Item[];
  taxRate: number;
  invoiceNumber: string;
  status?: string | undefined;
  subtotal: number;
  taxAmount: number;
  issuedAt: Date; 
  dueDate: Date; 
  _id?: string; 
  total?: number; 
  date?: Date; // Optional date field for additional flexibility
  number?: string; // Optional number field for invoice number

};



export type Client = {
  _id: string;
  name: string;
  email: string;
  phone?: string; // Optional field
  address?: string; // Optional field
};

export type MonthlySummary = {
  month: number;
  year: number;
  totalInvoices: number;
  totalAmount: number;
  totalPaid: number;
  totalPending: number;
days: {
    day: number;
} | undefined}

export type userInvoice = {
  _id: string;}

  export type form =  {
    name: string;
    email: string;
    phone: string;
}

export type invoiceUpdate = {
      clientId: string,
      items: Item[],
      taxRate: number,
      status: string | undefined,
      date: Date | undefined,
    }


    export type graficosType = {
      days: string[];
         totalInvoices: number
       paidInvoices: number,
       pendingInvoices: number
    }