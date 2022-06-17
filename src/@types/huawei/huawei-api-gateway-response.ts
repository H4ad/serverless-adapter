//#region Imports

import { MultiValueHeaders } from '../headers';

//#endregion

/**
 * The interface that represents the Api Gateway Response of Huawei when integrate with Function Graph of Event Type.
 * See more in {@link https://support.huaweicloud.com/intl/en-us/devg-functiongraph/functiongraph_02_0102.html#functiongraph_02_0102__li5178638110137 | Reference}.
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiApiGatewayResponse
 */
export interface HuaweiApiGatewayResponse {
  /**
   * Tells if the body was encoded as base64
   */
  isBase64Encoded: boolean;

  /**
   * The HTTP Status code of this response
   */
  statusCode: number;

  /**
   * The headers sent with this response
   */
  headers: MultiValueHeaders;

  /**
   * The body value with the content of this response serialized in JSON
   */
  body: string;
}
