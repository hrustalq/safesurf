/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ListListParams1 {
  /**
   * Search query
   * @example "my_awsome_vps"
   */
  query?: string;
  /** Filter by locations codes */
  locations?: string[];
  /** Filter by plan code */
  plans?: string[];
  /** Filter by platform code */
  platforms?: string[];
  /** Filter by status code */
  statuses?: string[];
  /** Filter by state code */
  states?: string[];
  /**
   * list limitation
   * @example 10
   */
  limit: number;
  /**
   * list offsetting
   * @example 0
   */
  offset?: number;
}

export interface PlansListParams {
  /** Filter by locations codes */
  locations?: string[];
  /** Filter by platform code */
  platforms?: string[];
  /** Filter by drive code */
  drive?: string[];
  /**
   * Filter by period code
   * @default "1m"
   */
  period?: string;
  /**
   * Filter by top
   * @example "top=true"
   */
  top?: boolean;
}

export interface ListListParams3 {
  /**
   * Search query
   * @example "my_awsome_vps"
   */
  query?: string;
  /** Filter by locations codes */
  locations?: string[];
  /** Filter by plan code */
  plans?: string[];
  /** Filter by platform code */
  platforms?: string[];
  /** Filter by status code */
  statuses?: string[];
  /** Filter by state code */
  states?: string[];
  /**
   * list limitation
   * @example 10
   */
  limit: number;
  /**
   * list offsetting
   * @example 0
   */
  offset?: number;
}

export interface PlansListParams2 {
  /** Filter by locations codes */
  locations?: string[];
  /**
   * Filter by period code
   * @default "1m"
   */
  period?: string;
  /**
   * Filter by top
   * @example "top=true"
   */
  top?: boolean;
}

export interface ListListParams5 {
  /**
   * Search query
   * @example "my_awsome_vps"
   */
  query?: string;
  /** Filter by locations codes */
  locations?: string[];
  /** Filter by status code */
  statuses?: string[];
  /** Filter by state code */
  states?: string[];
  /**
   * list limitation
   * @example 10
   */
  limit: number;
  /**
   * list offsetting
   * @example 0
   */
  offset?: number;
}

export interface PlansListParams4 {
  /** Filter by locations codes */
  locations?: string[];
  /**
   * Filter by period code
   * @default "1m"
   */
  period?: string;
  /**
   * Filter by top
   * @example "top=true"
   */
  top?: boolean;
}

export interface ListListParams7 {
  /**
   * Search query
   * @example "my_awsome_vps"
   */
  query?: string;
  /** Filter by locations codes */
  locations?: string[];
  /** Filter by status code */
  statuses?: string[];
  /** Filter by state code */
  states?: string[];
  /**
   * list limitation
   * @example 10
   */
  limit: number;
  /**
   * list offsetting
   * @example 0
   */
  offset?: number;
}

export interface PlansListParams6 {
  /** Filter by locations codes */
  locations?: string[];
  /**
   * Filter by RAM range
   * @example "ram[min]=1&ram[max]=10"
   */
  ram?: string;
  /**
   * Filter by CPU type
   * @example "cpu[type]=intel"
   */
  "cpu[type]"?: string;
  /**
   * Filter by CPU range
   * @example "cpu[min]=1&cpu[max]=10"
   */
  cpu?: string;
  /**
   * Filter by drives type
   * @example "drive[0][type]=SSD&...&drive[n][type]=HDD"
   */
  "drive[n][type]"?: string;
  /**
   * Filter by drives range
   * @example "drive[0][min]=300GB&drive[0][max]=600GB&...&drive[n][min]=300GB&drive[n][max]=600GB"
   */
  drive?: string;
  /**
   * Filter by bandwidth range
   * @example "bandwidth[min]=10Mbps&bandwidth[max]=20Gbps"
   */
  bandwidth?: string;
  /**
   * Filter by traffic range
   * @example "traffic[min]=10Tb&traffic[max]=unlimited"
   */
  traffic?: string;
  /**
   * Filter by gpu code
   * @example "gpu[0]=nvidia310&gpu[1]=T1000-4GB or gpu=true|false"
   */
  gpu?: string[] | boolean;
  /**
   * Filter by gpu code
   * @example "ddos[0]=adv1200&ddos[1]=l2l4base or ddos=true|false"
   */
  ddos?: string[] | boolean;
  /**
   * Sorting by price
   * @example "sort[price]=ASC"
   */
  "sort[price]"?: string;
  /**
   * Filter by period code
   * @default "1m"
   */
  period?: string;
  /**
   * Filter by top
   * @example "top=true"
   */
  top?: boolean;
}

export interface InvoicesListParams {
  /**
   * period from
   * @example 1579443742
   */
  "period[from]"?: number;
  /**
   * period to
   * @example 1579443742
   */
  "period[to]"?: number;
  /**
   * list limitation
   * @example 10
   */
  limit: number;
  /**
   * list offsetting
   * @example 0
   */
  offset?: number;
  /** Filter by status code */
  status?: string;
  /** Filter by service id */
  service?: string;
}

export interface BalanceInvoicesListParams {
  /**
   * period from
   * @example 1579443742
   */
  "period[from]"?: number;
  /**
   * period to
   * @example 1579443742
   */
  "period[to]"?: number;
  /**
   * list limitation
   * @example 10
   */
  limit: number;
  /**
   * list offsetting
   * @example 0
   */
  offset?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.ishosting.com";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title IS Hosting API
 * @version 1.1.0
 * @termsOfService https://ishosting.com/en/terms-of-use
 * @baseUrl https://api.ishosting.com
 * @contact API Support <support@ishosting.com>
 *
 * IS Hosting API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  profile = {
    /**
     * No description
     *
     * @tags Profile
     * @name ProfileList
     * @summary Get profile info
     * @request GET:/profile
     * @secure
     * @response `200` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    profileList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/profile`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  settings = {
    /**
     * No description
     *
     * @tags Settings
     * @name ProfileList
     * @summary Get profile settings
     * @request GET:/settings/profile
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    profileList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/settings/profile`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Settings
     * @name ProfilePartialUpdate
     * @summary Edit profile settings
     * @request PATCH:/settings/profile
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    profilePartialUpdate: (
      data: {
        personal?: {
          firstname?: string;
          lastname?: string;
          phone?: string;
          email?: string;
          network?: {
            type?: string;
            identity?: string;
          };
          address?: {
            line_1?: string;
            line_2?: string;
            city?: string;
            country?: string;
            zip?: string;
          };
        };
        company?: {
          name?: string;
          vat?: string;
          phone?: string;
          address?: {
            line_1?: string;
            line_2?: string;
            city?: string;
            country?: string;
            zip?: string;
          };
        };
        notifications?: {
          general?: boolean;
          details?: boolean;
          services?: boolean;
          billing?: boolean;
          support?: boolean;
        };
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/settings/profile`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Settings
     * @name GetSettings
     * @summary Get ssh keys
     * @request GET:/settings/ssh
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    getSettings: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/settings/ssh`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Settings
     * @name PostSettings
     * @summary Add new ssh key
     * @request POST:/settings/ssh
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    postSettings: (
      data: {
        title: string;
        public: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/settings/ssh`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Settings
     * @name DeleteSettings
     * @summary Delete ssh key
     * @request DELETE:/settings/ssh/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    deleteSettings: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/settings/ssh/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  services = {
    /**
     * No description
     *
     * @tags Services
     * @name StatsList
     * @summary Get services counters and stats
     * @request GET:/services/stats
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    statsList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/services/stats`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Services
     * @name ListList
     * @summary Get services list short info
     * @request GET:/services/list
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    listList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/services/list`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  vps = {
    /**
     * No description
     *
     * @tags VPS
     * @name ListList
     * @summary Get VPS list
     * @request GET:/vps/list
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    listList: (query: ListListParams1, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vps/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name GetVps
     * @summary Get VPS info
     * @request GET:/vps/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    getVps: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vps/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name PatchVps
     * @summary Patch VPS info
     * @request PATCH:/vps/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    patchVps: (
      id: string,
      data: {
        name?: string;
        tags?: string[];
        plan?: {
          auto_renew?: boolean;
        };
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/vps/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name StatusDetail
     * @summary Get VPS status
     * @request GET:/vps/{id}/status
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    statusDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vps/${id}/status`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name StatusPartialUpdate
     * @summary Change VPS status
     * @request PATCH:/vps/{id}/status/{action}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    statusPartialUpdate: (id: string, action: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vps/${id}/status/${action}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name PlansList
     * @summary Get VPS plans list
     * @request GET:/vps/plans
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    plansList: (query: PlansListParams, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vps/plans`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name PlanDetail
     * @summary Get VPS plan by code
     * @request GET:/vps/plan/{code}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    planDetail: (code: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vps/plan/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name ConfigsDetail
     * @summary Get VPS available configs
     * @request GET:/vps/configs/{code}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    configsDetail: (code: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vps/configs/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name PatchVps2
     * @summary Patch VPS VNC access
     * @request PATCH:/vps/{id}/vnc
     * @originalName patchVps
     * @duplicate
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    patchVps2: (
      id: string,
      data: {
        is_enabled?: boolean;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/vps/${id}/vnc`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name AccessSshPartialUpdate
     * @summary Patch VPS SSH access
     * @request PATCH:/vps/{id}/access/ssh
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    accessSshPartialUpdate: (
      id: string,
      data: {
        users?: object[];
        keys?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/vps/${id}/access/ssh`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name NetworkPartialUpdate
     * @summary Patch VPS IP
     * @request PATCH:/vps/{id}/network/{protocol}/{ip}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    networkPartialUpdate: (
      id: string,
      ip: string,
      protocol: string,
      data: {
        is_main?: boolean;
        rdns?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/vps/${id}/network/${protocol}/${ip}`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPS
     * @name NetworkDelete
     * @summary Delete VPS IP
     * @request DELETE:/vps/{id}/network/{protocol}/{ip}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    networkDelete: (id: string, ip: string, protocol: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vps/${id}/network/${protocol}/${ip}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  vpn = {
    /**
     * No description
     *
     * @tags VPN
     * @name ListList
     * @summary Get VPN list
     * @request GET:/vpn/list
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    listList: (query: ListListParams3, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vpn/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPN
     * @name GetVpn
     * @summary Get VPN info
     * @request GET:/vpn/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    getVpn: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vpn/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPN
     * @name PatchVpn
     * @summary Patch VPN info
     * @request PATCH:/vpn/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    patchVpn: (
      id: string,
      data: {
        name?: string;
        tags?: string[];
        plan?: {
          auto_renew?: boolean;
        };
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/vpn/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPN
     * @name StatusDetail
     * @summary Get VPN status
     * @request GET:/vpn/{id}/status
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    statusDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vpn/${id}/status`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPN
     * @name StatusPartialUpdate
     * @summary Change VPN status
     * @request PATCH:/vpn/{id}/status/{action}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    statusPartialUpdate: (id: string, action: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vpn/${id}/status/${action}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPN
     * @name PlansList
     * @summary Get VPN plans list
     * @request GET:/vpn/plans
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    plansList: (query: PlansListParams2, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vpn/plans`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPN
     * @name PlanDetail
     * @summary Get VPN plan by code
     * @request GET:/vpn/plan/{code}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    planDetail: (code: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vpn/plan/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPN
     * @name ConfigsDetail
     * @summary Get VPN available configs
     * @request GET:/vpn/configs/{code}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    configsDetail: (code: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vpn/configs/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPN
     * @name NetworkPartialUpdate
     * @summary Patch VPN IP
     * @request PATCH:/vpn/{id}/network/{protocol}/{ip}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    networkPartialUpdate: (
      id: string,
      ip: string,
      protocol: string,
      data: {
        is_main?: boolean;
        rdns?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/vpn/${id}/network/${protocol}/${ip}`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags VPN
     * @name NetworkDelete
     * @summary Delete VPN IP
     * @request DELETE:/vpn/{id}/network/{protocol}/{ip}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    networkDelete: (id: string, ip: string, protocol: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/vpn/${id}/network/${protocol}/${ip}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  storage = {
    /**
     * No description
     *
     * @tags Storage
     * @name ListList
     * @summary Get Storage list
     * @request GET:/storage/list
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    listList: (query: ListListParams5, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/storage/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name StorageDetail
     * @summary Get Storage info
     * @request GET:/storage/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    storageDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/storage/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name StoragePartialUpdate
     * @summary Patch Storage info
     * @request PATCH:/storage/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    storagePartialUpdate: (
      id: string,
      data: {
        name?: string;
        tags?: string[];
        plan?: {
          auto_renew?: boolean;
        };
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/storage/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name StatusDetail
     * @summary Get Storage status
     * @request GET:/storage/{id}/status
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    statusDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/storage/${id}/status`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name StatusPartialUpdate
     * @summary Change Storage status
     * @request PATCH:/storage/{id}/status/{action}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    statusPartialUpdate: (id: string, action: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/storage/${id}/status/${action}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name PlansList
     * @summary Get storage plans list
     * @request GET:/storage/plans
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    plansList: (query: PlansListParams4, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/storage/plans`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name PlanDetail
     * @summary Get storage plan by code
     * @request GET:/storage/plan/{code}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    planDetail: (code: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/storage/plan/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name ConfigsDetail
     * @summary Get Storage available configs
     * @request GET:/storage/configs/{code}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    configsDetail: (code: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/storage/configs/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name AccessSshPartialUpdate
     * @summary Patch Storage SSH access
     * @request PATCH:/storage/{id}/access/ssh
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    accessSshPartialUpdate: (
      id: string,
      data: {
        users?: object[];
        keys?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/storage/${id}/access/ssh`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name AccessFtpPartialUpdate
     * @summary Patch Storage FTP access
     * @request PATCH:/storage/{id}/access/ftp
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    accessFtpPartialUpdate: (
      id: string,
      data: {
        is_enabled?: boolean;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/storage/${id}/access/ftp`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name AccessSftpPartialUpdate
     * @summary Patch Storage sFTP access
     * @request PATCH:/storage/{id}/access/sftp
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    accessSftpPartialUpdate: (
      id: string,
      data: {
        is_enabled?: boolean;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/storage/${id}/access/sftp`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),
  };
  dedicated = {
    /**
     * No description
     *
     * @tags Dedicated
     * @name ListList
     * @summary Get Dedicated list
     * @request GET:/dedicated/list
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    listList: (query: ListListParams7, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/dedicated/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name DedicatedDetail
     * @summary Get Dedicated info
     * @request GET:/dedicated/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    dedicatedDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/dedicated/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name DedicatedPartialUpdate
     * @summary Patch Dedicated info
     * @request PATCH:/dedicated/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    dedicatedPartialUpdate: (
      id: string,
      data: {
        name?: string;
        tags?: string[];
        plan?: {
          auto_renew?: boolean;
        };
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/dedicated/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name StatusDetail
     * @summary Get Dedicated status
     * @request GET:/dedicated/{id}/status
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    statusDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/dedicated/${id}/status`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name StatusPartialUpdate
     * @summary Change Dedicated status
     * @request PATCH:/dedicated/{id}/status/{action}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    statusPartialUpdate: (id: string, action: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/dedicated/${id}/status/${action}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name PlansList
     * @summary Get Dedicated plans list
     * @request GET:/dedicated/plans
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    plansList: (query: PlansListParams6, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/dedicated/plans`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name PlanDetail
     * @summary Get Dedicated plan by code
     * @request GET:/dedicated/plan/{code}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    planDetail: (code: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/dedicated/plan/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name ConfigsDetail
     * @summary Get Dedicated available configs
     * @request GET:/dedicated/configs/{code}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    configsDetail: (code: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/dedicated/configs/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name AccessSshPartialUpdate
     * @summary Patch Dedicated SSH access
     * @request PATCH:/dedicated/{id}/access/ssh
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    accessSshPartialUpdate: (
      id: string,
      data: {
        users?: object[];
        keys?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/dedicated/${id}/access/ssh`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name NetworkPartialUpdate
     * @summary Patch Dedicated IP
     * @request PATCH:/dedicated/{id}/network/{protocol}/{ip}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    networkPartialUpdate: (
      id: string,
      ip: string,
      protocol: string,
      data: {
        is_main?: boolean;
        rdns?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/dedicated/${id}/network/${protocol}/${ip}`,
        method: "PATCH",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dedicated
     * @name NetworkDelete
     * @summary Delete Dedicated IP
     * @request DELETE:/dedicated/{id}/network/{protocol}/{ip}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    networkDelete: (id: string, ip: string, protocol: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/dedicated/${id}/network/${protocol}/${ip}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  billing = {
    /**
     * No description
     *
     * @tags Billing
     * @name OrderValidateCreate
     * @summary Validate order
     * @request POST:/billing/order/validate
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    orderValidateCreate: (
      data: {
        items?: object[];
        promo?: object[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/billing/order/validate`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name OrderCreate
     * @summary Create order
     * @request POST:/billing/order
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    orderCreate: (
      data: {
        items?: object[];
        promo?: object[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/billing/order`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name ConfigsList
     * @summary Get billing configs
     * @request GET:/billing/configs
     * @secure
     * @response `200` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    configsList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/billing/configs`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name PromoDetail
     * @summary Check promo code
     * @request GET:/billing/promo/{code}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    promoDetail: (code: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/billing/promo/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name InvoicesList
     * @summary Get invoices list
     * @request GET:/billing/invoices
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    invoicesList: (query: InvoicesListParams, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/billing/invoices`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name InvoiceDetail
     * @summary Get invoice data
     * @request GET:/billing/invoice/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    invoiceDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/billing/invoice/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name InvoiceStatusDetail
     * @summary Get invoice status
     * @request GET:/billing/invoice/{id}/status
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    invoiceStatusDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/billing/invoice/${id}/status`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name InvoicePayCreate
     * @summary Pay invoice
     * @request POST:/billing/invoice/{id}/pay
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    invoicePayCreate: (
      id: string,
      data: {
        balance?: boolean;
        renew?: boolean;
        method?: string;
        redirect?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/billing/invoice/${id}/pay`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name InvoiceCancelPartialUpdate
     * @summary Cancel invoice
     * @request PATCH:/billing/invoice/{id}/cancel
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    invoiceCancelPartialUpdate: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/billing/invoice/${id}/cancel`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name BalanceAddCreate
     * @summary Add funds
     * @request POST:/billing/balance/add
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    balanceAddCreate: (
      data: {
        amount?: number;
        method?: string;
        redirect?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/billing/balance/add`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name BalanceInvoicesList
     * @summary Get balance invoices list
     * @request GET:/billing/balance/invoices
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `5XX` `void` Unexpected error
     */
    balanceInvoicesList: (query: BalanceInvoicesListParams, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/billing/balance/invoices`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name BalanceInvoicesDetail
     * @summary Get balance invoice data
     * @request GET:/billing/balance/invoices/{id}
     * @secure
     * @response `200` `any`
     * @response `400` `any`
     * @response `401` `any`
     * @response `403` `any`
     * @response `404` `any`
     * @response `5XX` `void` Unexpected error
     */
    balanceInvoicesDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/billing/balance/invoices/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
