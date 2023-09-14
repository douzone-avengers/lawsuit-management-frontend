import axios, { AxiosResponse } from "axios";

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export type RequestSuccessHandler = (res: AxiosResponse<any, any>) => void;

export type RequestFailHandler = (e: {
  response: { data: any; status: number };
}) => void;

function requestDeprecated(
  method: HttpMethod,
  path: string,
  config?: {
    withToken?: boolean;
    useMock?: boolean;
    body?: Record<string, unknown>;
    params?: Record<string, string>;
    headers?: Record<string, string>;
    timeout?: number;
    onSuccess?: RequestSuccessHandler;
    onFail?: RequestFailHandler;
  },
) {
  // const useMock = config?.useMock ?? true;

  const ROOT = import.meta.env.DEV
    ? "http://localhost:3000/"
    : "http://52.79.44.141:8081/";
  // const ROOT = useMock ? "http://localhost:3000/api" : "http://localhost:8080";

  const url = path.startsWith("/") ? `${ROOT}${path}` : `${ROOT}/${path}`;

  const requestHeader = {
    ...config?.headers,
  };

  const withToken = config?.withToken ?? true;

  if (withToken) {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken !== null) {
      requestHeader["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  axios
    .request({
      method,
      url,
      data: config?.body,
      params: config?.params,
      headers: { ...requestHeader },
      timeout: config?.timeout,
    })
    .then((res) => {
      if (config?.onSuccess !== undefined) {
        config.onSuccess(res);
      }
    })
    .catch((e) => {
      if (config?.onFail !== undefined) {
        config.onFail(e);
      }
    });
}

export default requestDeprecated;
