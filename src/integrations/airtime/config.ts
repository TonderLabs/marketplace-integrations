
export const SUPPORTED_COUNTRIES = [
  {
    name: "Nigeria",
    code: "NGN",
  },
  {
    name: "Kenya",
    code: "KES",
  },
  {
    name: "Ghana",
    code: "GHS",
    shortCode: "GH",
  },
  {
    name: "Uganda",
    code: "UGX",
  },
  {
    name: "Tarzania",
    code: "UGX",
    shortCode: "TZ",
  },
  {
    name: "Ethiopia",
    code: "ETB",
  },
] as const;

export type CurrencyCode = (typeof SUPPORTED_COUNTRIES)[number]["code"];

//https://developers.africastalking.com/docs/airtime/sending #Request Limits
export const VALUE_LIMITS_PER_CURR_CODE: {
  [key in CurrencyCode]: { min: number; max: number };
} = {
  NGN: { min: 10, max: 20 },
  KES: { min: 10, max: 10000 },
  GHS: { min: 10, max: 20 },
  UGX: { min: 500, max: 100000 },
  ETB: { min: 10, max: 10000 },
};

