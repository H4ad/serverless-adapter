import { HuaweiApiGatewayAdapter } from '../../../../src/adapters/huawei';
import { createHuaweiApiGateway } from './huawei-api-gateway';

export const allHuaweiEvents: Array<[string, any]> = [
  [HuaweiApiGatewayAdapter.name, createHuaweiApiGateway('GET', '/users')],
  [
    HuaweiApiGatewayAdapter.name,
    createHuaweiApiGateway('GET', '/test', undefined, { 'x-batata': 'true' }),
  ],
  [HuaweiApiGatewayAdapter.name, createHuaweiApiGateway('DELETE', '/test/2')],
];
