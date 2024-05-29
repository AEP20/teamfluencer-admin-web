type BrandType = {
  _id: string;
  balance: number;
  email: string;
  brand_name: string;
  country: string;
  first_name: string;
  last_name: string;
  phone: string;
  currency: string;
  language: string;
  brand_logo: string;
  job_title: string;
  billing_address: BillingAddress;
  money_exchanges: MoneyExchanges[];
  notes: Array<string>;
  meetings: Meetings;
};

type Meetings = [
  {
    time: Date;
    description: string;
  },
];

type BillingAddress = {
  type: string;
  firm_name: string;
  contactName: string;
  id: string;
  city: string;
  country: string;
  address: string;
  zipCode: string;
};

type MoneyExchanges = {
  operation: string;
  amount: number;
  application_id: string;
  action_time: string;
};

type InfoType = {
  key: string;
  value: string | number | boolean | any[] | undefined;
};

type AllBrandType = {
  id: number;
  brand_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  balance: number;
  notes: Array<string>;
  meetings: Meetings;
  _id: string;
};

export type { BillingAddress, MoneyExchanges, BrandType, InfoType, AllBrandType, Meetings };
