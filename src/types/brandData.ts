type BrandType = {
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
};

type BillingAddress = {
  type: string;
  firm_name: string;
  id: string;
  city: string;
  country: string;
  address: string;
  zip_code: string;
};

type MoneyExchanges = {
  operation: string;
  amount: number;
};

type InfoType = {
  key: string;
  value: string | number | boolean | any[];
};

export type { BillingAddress, MoneyExchanges, BrandType, InfoType };
