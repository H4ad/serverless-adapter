export type GetRequestIDSecondsReturn = string;
export type GetRemainingTimeInMilliSecondsReturn = number;
export type GetAccessKeyReturn = string;
export type GetSecretKeyReturn = string;
export type GetUserDataKeyParameter = string;
export type GetUserDataReturn = any;
export type GetFunctionNameReturn = string;
export type GetRunningTimeInSecondsReturn = number;
export type GetVersionReturn = string;
export type GetMemorySizeReturn = number;
export type GetCPUNumberReturn = number;
export type GetProjectIdReturn = number;
export type GetPackageReturn = string;
export type GetLoggerReturn = {
  info(message: string): void;
};

export interface HuaweiContext {
  getRequestID(): GetRequestIDSecondsReturn;

  getRemainingTimeInMilliSeconds(): GetRemainingTimeInMilliSecondsReturn;

  getAccessKey(): GetAccessKeyReturn;

  getSecretKey(): GetSecretKeyReturn;

  getUserData(key: GetUserDataKeyParameter): GetUserDataReturn;

  getFunctionName(): GetFunctionNameReturn;

  getRunningTimeInSeconds(): GetRunningTimeInSecondsReturn;

  getVersion(): GetVersionReturn;

  getMemorySize(): GetMemorySizeReturn;

  getCPUNumber(): GetCPUNumberReturn;

  getProjectID(): GetProjectIdReturn;

  getPackage(): GetPackageReturn;

  getLogger(): GetLoggerReturn;
}
