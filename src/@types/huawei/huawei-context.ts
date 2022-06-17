/**
 * The return value of {@link HuaweiContext} getRequestID
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetRequestIDSecondsReturn = string;

/**
 * The return value of {@link HuaweiContext} getRemainingTimeInMilliSeconds
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetRemainingTimeInMilliSecondsReturn = number;

/**
 * The return value of {@link HuaweiContext} getAccessKey
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetAccessKeyReturn = string;

/**
 * The return value of {@link HuaweiContext} getSecretKey
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetSecretKeyReturn = string;

/**
 * The parameters of the method {@link HuaweiContext} getUserData
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetUserDataKeyParameter = string;

/**
 * The return value of {@link HuaweiContext} getUserData
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetUserDataReturn = any;

/**
 * The return value of {@link HuaweiContext} getFunctionName
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetFunctionNameReturn = string;

/**
 * The return value of {@link HuaweiContext} getRunningTimeInSeconds
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetRunningTimeInSecondsReturn = number;

/**
 * The return value of {@link HuaweiContext} getVersion
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetVersionReturn = string;

/**
 * The return value of {@link HuaweiContext} getMemorySize
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetMemorySizeReturn = number;

/**
 * The return value of {@link HuaweiContext} getCPUNumber
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetCPUNumberReturn = number;

/**
 * The return value of {@link HuaweiContext} getProjectID
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetProjectIdReturn = number;

/**
 * The return value of {@link HuaweiContext} getPackage
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetPackageReturn = string;

/**
 * The return value of {@link HuaweiContext} getToken
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetTokenReturn = string;

/**
 * The return value of {@link HuaweiContext} getLogger
 *
 * Is the instance of logger that can be used to send logs to
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export type GetLoggerReturn = {
  info(message: string): void;
};

/**
 * The interface that represents methods sent by huawei to get information about the function graph.
 * See more in {@link https://support.huaweicloud.com/intl/en-us/devg-functiongraph/functiongraph_02_0410.html#section1 | Context Methods}
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiContext
 */
export interface HuaweiContext {
  /**
   * Obtains a request ID.
   */
  getRequestID(): GetRequestIDSecondsReturn;

  /**
   * Obtains the remaining running time of a function.
   */
  getRemainingTimeInMilliSeconds(): GetRemainingTimeInMilliSecondsReturn;

  /**
   * Obtains the AK (valid for 24 hours) of an agency. If you use this method, you need to configure an agency for the function.
   */
  getAccessKey(): GetAccessKeyReturn;

  /**
   * Obtains the SK (valid for 24 hours) of an agency. If you use this method, you need to configure an agency for the function.
   */
  getSecretKey(): GetSecretKeyReturn;

  /**
   * Uses keys to obtain the values passed by environment variables.
   *
   * @param key - The key to get environment variables values
   */
  getUserData(key: GetUserDataKeyParameter): GetUserDataReturn;

  /**
   * Obtains the name of a function.
   */
  getFunctionName(): GetFunctionNameReturn;

  /**
   * Obtains the timeout of a function.
   */
  getRunningTimeInSeconds(): GetRunningTimeInSecondsReturn;

  /**
   * Obtains the version of a function.
   */
  getVersion(): GetVersionReturn;

  /**
   * Obtains the allocated memory.
   */
  getMemorySize(): GetMemorySizeReturn;

  /**
   * Number of CPU millicores used by the function (1 core = 1000 millicores).
   *
   * The value of this field is proportional to that of MemorySize. By default, 100 CPU millicores are required for 128 MB memory. The number of CPU millicores is calculated as follows: Memory/128 x 100 + 200 (basic CPU millicores).
   */
  getCPUNumber(): GetCPUNumberReturn;

  /**
   * Obtains a project ID.
   */
  getProjectID(): GetProjectIdReturn;

  /**
   * Obtains a function group, that is, an app.
   */
  getPackage(): GetPackageReturn;

  /**
   * Obtains the token (valid for 24 hours) of an agency. If you use this method, you need to configure an agency for the function.
   */
  getToken(): GetTokenReturn;

  /**
   * Obtains the logger method provided by the context and returns a log output class. Logs are output in the format of Time-Request ID-Content by using the info method.
   *
   * For example, use the info method to output logs:
   *
   * @example
   * ```typescript
   * logg = context.getLogger()
   *
   * logg.info("hello")
   * ```
   */
  getLogger(): GetLoggerReturn;
}
