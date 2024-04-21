import {
  AirtimeIntegration,
  INTEGRATION_NAME as AIRTIME_INTEGRATION,
} from "./airtime";
import {
  GiftCardIntegration,
  INTEGRATION_NAME as GIFTCARD_INTEGRATION,
} from "./giftcard";

export const integrations = {
  airtime: {
    handler: AirtimeIntegration,
    name: AIRTIME_INTEGRATION,
  },
  giftcards: {
    handler: GiftCardIntegration,
    name: GIFTCARD_INTEGRATION,
  },
};

export type IntegrationKey = keyof typeof integrations;

export type IntegrationType = typeof integrations[keyof typeof integrations]["handler"];
