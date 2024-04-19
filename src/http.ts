import axios, {
  AxiosInstance,
  AxiosResponse,
  Method,
  ResponseType,
} from "axios";

export type RequestConfig = {
  method?: Method;
  url: string;
  headers?: Record<string, string>;
  payload?: unknown;
  query?: Record<string, unknown>;
  responseType?: ResponseType;
  baseUrl?: string;
};

class HttpService {
  private _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create();
  }

  public async request<TResponse>(
    requestConfig: RequestConfig
  ): Promise<AxiosResponse<TResponse>> {
    return this._axiosInstance.request<TResponse>({
      method: requestConfig.method,
      url: requestConfig.url,
      params: requestConfig.query,
      headers: requestConfig.headers,
      data: requestConfig.payload,
      responseType: requestConfig.responseType,
      baseURL: requestConfig.baseUrl,
    });
  }

  public async get<Response>(
    requestConfig: RequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.request({
      ...requestConfig,
      method: "GET",
    });
  }

  public async post<Response>(
    requestConfig: RequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.request({
      ...requestConfig,
      method: "POST",
    });
  }
}

export const httpService = new HttpService();
