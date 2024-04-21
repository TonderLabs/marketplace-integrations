import { IntegrationKey, IntegrationType, integrations } from "./integrations";
import {
  Config,
  Integration,
  Pagination,
  QueryParams,
  SubmitDataPayload,
  DataResponse,
  GetAssetDataResult,
} from "./integration";

/**
 * Get an integration instance from its key.
 * @param integrationKey The integration key.
 * @returns The integration.
 * @throws {Error} If the integration does not exist.
 */
export const getIntegration = (
  integrationKey: IntegrationKey
): {
  handler: IntegrationType;
  name: string;
} => {
  const integration = integrations[integrationKey];
  if (!integration) {
    throw new Error(`Integration ${integrationKey} not found`);
  }
  return integration;
};

/**
 * Find an integration instance that can handle a webhook payload.
 * @param payload The webhook payload.
 * @param config The configuration.
 * @returns The integration instance or undefined if not found.
 */
export const integrationFromWebhookPayload = (
  payload: Record<string, unknown>,
  config: Config
): Integration | undefined => {
  let integration: Integration | undefined;
  Object.keys(integrations).forEach((implName) => {
    const integrationInstance = new integrations[
      implName as IntegrationKey
    ].handler(config);
    if (integrationInstance.validateWebhookPayload(payload)) {
      integration = integrationInstance;
    }
  });
  return integration;
};

/**
 * Handle a webhook.
 * @param payload The webhook payload.
 * @param config The configuration.
 * @returns A promise that resolves to the data response.
 * @throws {Error} If the integration does not exist or cannot handle the
 * webhook payload.
 */
export const handleWebhook = async (
  payload: Record<string, unknown>,
  config: Config
): Promise<DataResponse> => {
  const integrationInstance = integrationFromWebhookPayload(payload, config);
  if (!integrationInstance) {
    throw new Error("Integration not found");
  }
  return integrationInstance.handleWebhook(payload);
};

/**
 * A class that maps integration keys to their handlers.
 */
export class IntegrationMapper {
  /**
   * The configuration.
   */
  private readonly config: Config;

  /**
   * Constructor.
   * @param config The configuration.
   */
  constructor(config: Config) {
    this.config = config;
  }

  /**
   * Get the asset data with optional filters.
   * @param integrationKey The integration key.
   * @param pagination The pagination options.
   * @param requestQueryParams Optional query parameters from the request.
   * @returns A promise that resolves to the asset data and any supported
   * query parameters.
   * @throws {Error} If the integration does not exist.
   */
  public getData(
    integrationKey: IntegrationKey,
    pagination: Pagination,
    requestQueryParams?: QueryParams
  ): Promise<GetAssetDataResult> {
    const integration = getIntegration(integrationKey);
    const integrationInstance = new integration.handler(this.config);
    return integrationInstance.getAssetData(
      pagination,
      requestQueryParams
    );
  }

  /**
   * Submit data to the asset provider.
   * @param integrationKey The integration key.
   * @param data The data to submit.
   * @returns A promise that resolves to the data response.
   * @throws {Error} If the integration does not exist.
   */
  public submitData(
    integrationKey: IntegrationKey,
    data: SubmitDataPayload
  ): Promise<DataResponse> {
    const integration = getIntegration(integrationKey);
    return new integration.handler(this.config).submitData(data);
  }

  /**
   * Get the list of integrations.
   * @returns The list of integrations.
   */
  public getIntegrations(): {
    key: IntegrationKey;
    handler: string;
    name: string;
  }[] {
    return Object.keys(integrations).map((integrationKey) => {
      const key = integrationKey as IntegrationKey;
      return {
        ...integrations[key],
        key,
        handler: "handler",
      };
    });
  }

  /**
   * Handle a webhook.
   * @param payload The webhook payload.
   * @returns A promise that resolves to the data response.
   * @throws {Error} If the integration does not exist or cannot handle the
   * webhook payload.
   */
  public async handleWebhook(
    payload: Record<string, unknown>
  ): Promise<DataResponse> {
    return handleWebhook(payload, this.config);
  }
}
