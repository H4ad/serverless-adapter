import awsAlbEventSource from './aws/alb';
import awsApiGatewayV1EventSource from './aws/api-gateway-v1';
import awsApiGatewayV2EventSource from './aws/api-gateway-v2';
import awsDynamoDbEventSource from './aws/dynamodb';
import awsLambdaEdgeEventSource from './aws/lambda-edge';
import awsSnsEventSource from './aws/sns';
import awsSqsEventSource from './aws/sqs';

export function getEventSource({ eventSourceName }) {
  switch (eventSourceName) {
    case 'AWS_API_GATEWAY_V1':
      return awsApiGatewayV1EventSource;
    case 'AWS_API_GATEWAY_V2':
      return awsApiGatewayV2EventSource;
    case 'AWS_ALB':
      return awsAlbEventSource;
    case 'AWS_LAMBDA_EDGE':
      return awsLambdaEdgeEventSource;
    case 'AWS_DYNAMODB':
      return awsDynamoDbEventSource;
    case 'AWS_SNS':
      return awsSnsEventSource;
    case 'AWS_SQS':
      return awsSqsEventSource;
    default:
      throw new Error("Couldn't detect valid event source.");
  }
}
