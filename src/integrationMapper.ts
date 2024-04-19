import { IntegrationKey, integrations } from "./integrations";
import {
  Config,
  Integration,
  Pagination,
  QueryParams,
  SubmitDataPayload,
} from "./integration";

const getIntegration = (integrationKey: IntegrationKey) => {
  const integration = integrations[integrationKey];
  if (!integration) {
    throw new Error(`Integration ${integrationKey} not found`);
  }
  return integration;
};

const integrationFromWebhookPayload = (
  payload: Record<string, unknown>,
  config: Config
) => {
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

const handleWebhook = async (
  payload: Record<string, unknown>,
  config: Config
) => {
  const integrationInstance = integrationFromWebhookPayload(payload, config);
  if (!integrationInstance) {
    throw new Error("Integration not found");
  }
  return integrationInstance.handleWebhook(payload);
};

export class IntegrationMapper {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public getData(
    integrationKey: IntegrationKey,
    pagination: Pagination,
    requestQueryParams?: QueryParams
  ) {
    const integration = getIntegration(integrationKey);
    return new integration.handler(this.config).getAssetData(
      pagination,
      requestQueryParams
    );
  }

  public submitData(integrationKey: IntegrationKey, data: SubmitDataPayload) {
    const integration = getIntegration(integrationKey);
    return new integration.handler(this.config).submitData(data);
  }

  public getIntegrations() {
    return Object.keys(integrations).map((integrationKey) => {
      const key = integrationKey as IntegrationKey;
      return {
        ...integrations[key],
        key,
        handler: "handler",
      };
    });
  }

  public async handleWebhook(payload: Record<string, unknown>) {
    return handleWebhook(payload, this.config);
  }
}
