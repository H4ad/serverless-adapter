import { FrameworkContract } from '@h4ad/serverless-adapter';
import type { IncomingMessage, ServerResponse } from 'http';
import { ObjectReadableMock } from 'stream-mock';

/**
 * The class that represents a mock for framework that forward the request body to the response.
 *
 * @internal
 */
export class FrameworkMock implements FrameworkContract<null> {
  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    protected readonly statusCode: number,
    protected readonly mockedResponseData: object,
  ) {}

  //#endregion

  /**
   * {@inheritDoc}
   */
  public sendRequest(
    _: null,
    __: IncomingMessage,
    response: ServerResponse,
  ): void {
    const writableOutput = new ObjectReadableMock(
      [Buffer.from(JSON.stringify(this.mockedResponseData))],
      {
        objectMode: true,
      },
    );

    response.statusCode = this.statusCode;
    response.setHeader('content-type', 'application/json');

    writableOutput.pipe(response);
  }
}
