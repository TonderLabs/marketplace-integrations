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
  // Additional data to be passed to the submitData method.
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

// SubmitDataPayload represents the payload for the submitData method.
export type SubmitDataPayload = {
  amount: number;
  [key: string]: unknown;
};

// GetAssetDataResult represents the result of the getAssetData method.
export type GetAssetDataResult = {
  data: GetDataResponse[];
  supportedQueryParams?: QueryParams;
};

// Pagination represents the pagination options.
export type Pagination = {
  page: number;
  limit: number;
};

export type Config = Record<string, unknown>;

// Integration is an abstract class for all integrations.
export abstract class Integration {
  // Config variables passed to the integration from application.
  protected config: Config;
  constructor(config: Config) {
    this.config = config;
  }

  // getAssetData gets the asset data with optional filters.
  abstract getAssetData(
    pagination: Pagination,
    requestQueryParams?: QueryParams
  ): Promise<GetAssetDataResult>;

  // submitData submits data to the asset provider.
  abstract submitData(data: SubmitDataPayload): Promise<DataResponse>;

  // handleWebhook handles a webhook from the asset provider.
  abstract handleWebhook(data: unknown): Promise<DataResponse>;

 abstract validateWebhookPayload(requestBody: Record<string, unknown>): boolean;
}
