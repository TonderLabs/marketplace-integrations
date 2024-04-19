import { httpService } from "../../http";
import {
  Config,
  DataResponse,
  GetAssetDataResult,
  Integration,
  Pagination,
  PriceDenominationType,
  QueryParams,
  SubmitDataPayload,
} from "../../integration";
import { IntegrationError } from "../../error";
import {
  SUPPORTED_COUNTRIES,
  CurrencyCode,
  VALUE_LIMITS_PER_CURR_CODE,
} from "./config";
import Africastalking from "africastalking";

export const INTEGRATION_NAME = "Airtime";

export class AirtimeIntegration extends Integration {
  validateWebhookPayload(_: Record<string, unknown>): boolean {
    throw new Error("Method not implemented.");
  }
  africastalking: any; // Africastalking type is not available in the Africastalking package

  constructor(config: Config) {
    super(config);
    const username = this.config.AIRTIME_USERNAME as string;
    const apiKey = this.config.AIRTIME_API_KEY as string;
    this.africastalking = Africastalking({
      username,
      apiKey,
    });
  }

  private async getExchangeRateData(): Promise<
    Partial<Record<`USD${CurrencyCode}`, number>>
  > {
    try {
      const ratesApi = this.config.AIRTIME_RATES_API as string;
      const {
        data: { quotes },
      } = await httpService.get<{
        quotes: Record<`USD${CurrencyCode}`, number>;
      }>({
        url: ratesApi,
      });

      return quotes;
    } catch (error) {
      throw new IntegrationError(
        "Failed to get exchange rates",
        INTEGRATION_NAME,
        "getExchangeRateData",
        error
      );
    }
  }

  private getAssetValueFromUSD(
    currencyCode: CurrencyCode,
    exchangeRates: Partial<Record<`USD${CurrencyCode}`, number>>,
    valueInUSD: number
  ): number {
    const exchangeRate = exchangeRates[`USD${currencyCode}`];
    if (!exchangeRate) {
      throw new IntegrationError(
        "Exchange rate not found",
        INTEGRATION_NAME,
        "getAssetValueFromUSD"
      );
    }

    return valueInUSD * exchangeRate;
  }

  private getAssetValueLimitsInUSD(
    currencyCode: CurrencyCode,
    exchangeRates: Partial<Record<`USD${CurrencyCode}`, number>>
  ): {
    min: number;
    max: number;
  } {
    const exchangeRate = exchangeRates[`USD${currencyCode}`];
    if (!exchangeRate) {
      throw new IntegrationError(
        "Exchange rate not found",
        INTEGRATION_NAME,
        "getAssetValueLimitsInUSD"
      );
    }

    return {
      min: VALUE_LIMITS_PER_CURR_CODE[currencyCode].min / exchangeRate,
      max: VALUE_LIMITS_PER_CURR_CODE[currencyCode].max / exchangeRate,
    };
  }

  async getAssetData(
    _: Pagination,
    requestQueryParams?: QueryParams
  ): Promise<GetAssetDataResult> {
    try {
      const country = requestQueryParams?.country;
      const rateInfo = await this.getExchangeRateData();
      return {
        data: [
          {
            name: "Nigeria",
            priceDenominationType: PriceDenominationType.FIXED,
            price: this.getAssetValueLimitsInUSD("NGN", rateInfo),
            data: {
              currencyCode: "NGN",
            },
          },
          {
            name: "Kenya",
            priceDenominationType: PriceDenominationType.FIXED,
            price: this.getAssetValueLimitsInUSD("KES", rateInfo),
            data: {
              currencyCode: "KES",
            },
          },
          {
            name: "Ghana",
            priceDenominationType: PriceDenominationType.FIXED,
            price: this.getAssetValueLimitsInUSD("GHS", rateInfo),
            data: {
              currencyCode: "GHS",
            },
          },
          {
            name: "Uganda",
            priceDenominationType: PriceDenominationType.FIXED,
            price: this.getAssetValueLimitsInUSD("UGX", rateInfo),
            data: {
              currencyCode: "UGX",
            },
          },
          {
            name: "Tarzania",
            priceDenominationType: PriceDenominationType.FIXED,
            price: this.getAssetValueLimitsInUSD("UGX", rateInfo),
            data: {
              currencyCode: "UGX",
            },
          },
          {
            name: "Ethiopia",
            priceDenominationType: PriceDenominationType.FIXED,
            price: this.getAssetValueLimitsInUSD("ETB", rateInfo),
            data: {
              currencyCode: "ETB",
            },
          },
        ].filter((asset) => !country || country === asset.data.currencyCode),
        supportedQueryParams: {
          country: SUPPORTED_COUNTRIES.map((country) => country.code),
        },
      };
    } catch (error) {
      throw new Error("Failed to get asset data for airtime integration");
    }
  }
  async submitData(data: SubmitDataPayload): Promise<DataResponse> {
    try {
      const airtime = this.africastalking.AIRTIME;
      const rateInfo = await this.getExchangeRateData();
      const options = {
        recipients: [
          {
            ...data,
            amount: String(
              this.getAssetValueFromUSD(
                data.currencyCode as CurrencyCode,
                rateInfo,
                data.amount
              )
            ),
          },
        ],
      };
      const response = await airtime.send(options);

      if (response?.errorMessage !== "None") {
        throw new IntegrationError(
          "Failed to send airtime",
          INTEGRATION_NAME,
          "submitData",
          response?.errorMessage
        );
      }

      return {
        success: true,
        message: "Airtime sent successfully",
        transactionReference: response.responses[0].requestId,
      };
    } catch (error) {
      throw new IntegrationError(
        "Failed to send airtime",
        INTEGRATION_NAME,
        "submitData"
      );
    }
  }
  handleWebhook(data: unknown): Promise<DataResponse> {
    throw new Error("Method not implemented.");
  }
}
