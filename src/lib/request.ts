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

export type RequestFailHandler = (e?: Error) => void;

function request(
  method: HttpMethod,
  path: string,
  config?: {
    withToken?: boolean;
    body?: Record<string, unknown>;
    params?: Record<string, string>;
    headers?: Record<string, string>;
    timeout?: number;
    onSuccess?: RequestSuccessHandler;
    onFail?: RequestFailHandler;
  },
) {
  const ROOT = import.meta.env.DEV ? "http://localhost:3000/api" : ""; // TODO: 배포되고 난 다음
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

export default request;
