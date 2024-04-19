import {
  DataResponse,
  GetAssetDataResult,
  Integration,
  Pagination,
  QueryParams,
  SubmitDataPayload,
} from "../../integration";

export const INTEGRATION_NAME = "Giftcards";

export class GiftCardIntegration extends Integration {
  getAssetData(
    pagination: Pagination,
    requestQueryParams?: QueryParams
  ): Promise<GetAssetDataResult> {
    throw new Error("Method not implemented.");
  }
  submitData(data: SubmitDataPayload): Promise<DataResponse> {
    throw new Error("Method not implemented.");
  }
  handleWebhook(data: unknown): Promise<DataResponse> {
    throw new Error("Method not implemented.");
  }
  validateWebhookPayload(requestBody: Record<string, unknown>): boolean {
    throw new Error("Method not implemented.");
  }
}
