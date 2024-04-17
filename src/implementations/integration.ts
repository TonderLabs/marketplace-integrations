// PriceDenominationType represents the types of price denominations.
export enum PriceDenominationType {
  FIXED = "FIXED",
  RANGE = "RANGE",
}

// FieldInputType represents the types of input fields.
export enum FieldInputType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
  RADIO = "RADIO",
  TEXTAREA = "TEXTAREA",
  DATE = "DATE",
  TIME = "TIME",
  DATETIME = "DATETIME",
  PHONE = "PHONE",
}

// Field represents a form field.
export type Field = {
  name: string;
  type: FieldInputType;
  key: string;
  options?: string[];
  required?: boolean;
};

// GetDataResponse represents the response from the getAssetData method.
export type GetDataResponse = {
  name: string;
  description?: string;
  image?: string;
  priceDenominationType: PriceDenominationType;
  price: number | { min: number; max: number };
  fields?: Field[];
  data: Record<string, unknown>;
};

// QueryParams represents the filters for getting asset data.
export type QueryParams = Record<string, unknown>;

// DataResponse represents the response from the submitData and handleWebhook methods.
export type DataResponse = {
  success: boolean;
  message?: string;
  transactionReference: string;
};

// UserValues represents the user values in the submitData payload.
type UserValues = {
  amount?: number;
  [key: string]: unknown;
};

// SubmitDataPayload represents the payload for the submitData method.
export type SubmitDataPayload = {
  userValues: UserValues;
  [key: string]: unknown;
};

// GetAssetDataResult represents the result of the getAssetData method.
export type GetAssetDataResult = {
  data: GetDataResponse[];
  queryParams?: QueryParams;
};

// Pagination represents the pagination options.
export type Pagination = {
  page: number;
  limit: number;
};

// Integration is an abstract class for all integrations.
export abstract class Integration {
  // getAssetData gets the asset data with optional filters.
  abstract getAssetData(
    pagination: Pagination,
    queryParams?: QueryParams
  ): Promise<GetAssetDataResult>;

  // submitData submits data to the asset provider.
  abstract submitData(data: SubmitDataPayload): Promise<DataResponse>;

  // handleWebhook handles a webhook from the asset provider.
  abstract handleWebhook(data: unknown): Promise<DataResponse>;
}
