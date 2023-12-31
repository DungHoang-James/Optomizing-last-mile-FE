import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

import type { Response } from "@/types";
import { convertSearchParams, removeNullUndefined } from "@/utils/helper";

import { axios } from "./axios";

export const request = async (config: AxiosRequestConfig) => {
  try {
    const res = await axios.request(config);
    return res;
  } catch (error) {
    const res = error as AxiosError<any>;
    Promise.reject(res);
  }
};

export const fetchWithGet = <
  T,
  TBaseURL extends string | undefined = undefined,
>({
  queryKey,
  signal,
  baseURL,
}: {
  queryKey: any;
  signal?: AbortSignal;
  baseURL?: TBaseURL;
}): Promise<
  AxiosResponse<TBaseURL extends string ? T : Response<T>, any> | undefined
> => {
  const resultNorNullUndefined = removeNullUndefined(queryKey[1]);
  const params = convertSearchParams(resultNorNullUndefined);

  return request({
    method: "GET",
    params: params,
    url: queryKey[0],
    signal,
    baseURL,
  });
};

export const fetchWithOptionMethod = <TData = unknown>(
  url: string,
  data: TData,
  method: Exclude<Method, "GET">
) => {
  return request({
    method,
    data,
    url,
  });
};
