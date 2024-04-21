/**
 * Represents the type of price denomination.
 */
export enum PriceDenominationType {
  FIXED = "FIXED",
  RANGE = "RANGE",
}

/**
 * Represents the type of field input.
 */
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

/**
 * Represents a form field that is used to collect user input
 * during the submission of an asset.
 */
export type Field = {
  /**
   * The label of the field.
   */
  name: string;
  /**
   * The type of input field.
   */
  type: FieldInputType;
  /**
   * A unique identifier for this field.
   */
  key: string;
  /**
   * Options for fields with a select type.
   */
  options?: string[];
  /**
   * Indicates if the field is required to be completed before submitting.
   */
  required?: boolean;
};

/**
 * Represents the response from the getAssetData method.
 */
export type GetDataResponse = {
  /**
   * The name of the asset.
   */
  name: string;
  /**
   * A description of the asset.
   */
  description?: string;
  /**
   * An image URL representing the asset.
   */
  image?: string;
  /**
   * The type of denomination for the price field(s).
   */
  priceDenominationType: PriceDenominationType;
  /**
   * The price(s) of the asset, denoted in the specified denomination type.
   * If there are multiple price fields, this will be an object with
   * `min` and `max` keys.
   */
  price: number | { min: number; max: number };
  /**
   * Additional form fields that need to be completed in order to
   * submit the asset.
   */
  fields?: Field[];
  /**
   * Additional data to be passed to the submitData method.
   */
  data: Record<string, unknown>;
};

// QueryParams represents the filters for getting asset data.
/**
 * Represents the query parameters for an integration.
 */
export type QueryParams = Record<string, unknown>;

// DataResponse represents the response from the submitData and handleWebhook methods.
/**
 * Represents the response from the submitData and handleWebhook methods.
 */
export interface DataResponse {
  /**
   * Whether the submission or webhook handling was successful.
   */
  success: boolean;
  /**
   * An optional message from the integration, if applicable.
   */
  message?: string;
  /**
   * A transaction reference from the provider, if applicable.
   */
  transactionReference: string;
}

/**
 * SubmitDataPayload represents the payload for the submitData method.
 *
 * The payload should contain the `amount` field, which is the amount
 * of the asset that the user wants to purchase, as well as any other
 * custom fields that the integration requires.
 */
export type SubmitDataPayload = {
  /** The amount of the asset to purchase. */
  amount: number;
  /** Any additional fields required by the integration. */
  [key: string]: unknown;
};

/**
 * Represents the result of the getAssetData method.
 *
 * The result will contain an array of asset data, as well as any
 * optional supported query parameters for getting asset data.
 */
export type GetAssetDataResult = {
  /** An array of asset data. */
  data: GetDataResponse[];
  /** Optional supported query parameters for getting asset data. */
  supportedQueryParams?: QueryParams;
};

// Pagination represents the pagination options.
/**
 * Pagination represents the pagination options.
 *
 * `page` is the page number to retrieve, and `limit` is the number of items to
 * return per page.
 */
export type Pagination = {
  /** The page number to retrieve. */
  page: number;
  /** The number of items to return per page. */
  limit: number;
};

/**
 * Represents the configuration variables passed to the integration from
 * the application.
 */
export type Config = Record<string, unknown>;

/**
 * Abstract class that must be implemented by all integrations.
 */
export abstract class Integration {
  /**
   * The configuration variables passed to the integration from the
   * application.
   */
  protected readonly config: Config;

  /**
   * Constructor for the integration.
   * @param config The configuration variables passed from the application.
   */
  constructor(config: Config) {
    this.config = config;
  }

  /**
   * Gets the asset data with optional filters.
   * @param pagination The pagination options.
   * @param requestQueryParams Optional query parameters from the request.
   * @returns A promise that resolves to the asset data and any supported
   * query parameters.
   */
  abstract getAssetData(
    pagination: Pagination,
    requestQueryParams?: QueryParams
  ): Promise<GetAssetDataResult>;

  /**
   * Submits data to the asset provider.
   * @param data The data to submit.
   * @returns A promise that resolves to the data response.
   */
  abstract submitData(data: SubmitDataPayload): Promise<DataResponse>;

  /**
   * Handles a webhook from the asset provider.
   * @param data The webhook data.
   * @returns A promise that resolves to the data response.
   */
  abstract handleWebhook(data: unknown): Promise<DataResponse>;

  /**
   * Validates the request body of a webhook.
   * @param requestBody The request body of the webhook.
   * @returns Whether the request body is valid.
   */
  abstract validateWebhookPayload(
    requestBody: Record<string, unknown>
  ): boolean;
}
