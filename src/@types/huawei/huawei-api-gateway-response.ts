import { MultiValueHeaders } from '../headers';

export interface HuaweiApiGatewayResponse {
  isBase64Encoded: boolean;
  statusCode: number;
  headers: MultiValueHeaders;
  body: string;
}
