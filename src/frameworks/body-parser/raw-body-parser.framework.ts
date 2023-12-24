//#region Imports

import { type Options, raw } from 'body-parser';
import type { FrameworkContract } from '../../contracts';
import {
  BaseBodyParserFramework,
  type BodyParserOptions,
} from './base-body-parser.framework';

//#endregion

/**
 * The body-parser options for application/octet-stream
 *
 * @remarks {@link https://github.com/expressjs/body-parser#bodyparserrawoptions}
 *
 * @breadcrumb Frameworks / BodyParserFramework / RawBodyParserFramework
 * @public
 */
export type RawBodyParserFrameworkOptions = Options & BodyParserOptions;

/**
 * The body-parser class used to parse application/octet-stream.
 *
 * @breadcrumb Frameworks / BodyParserFramework / RawBodyParserFramework
 * @public
 */
export class RawBodyParserFramework<TApp>
  extends BaseBodyParserFramework<TApp>
  implements FrameworkContract<TApp>
{
  //#region Constructor

  /**
   * Default Constructor
   */
  constructor(
    framework: FrameworkContract<TApp>,
    options?: RawBodyParserFrameworkOptions,
  ) {
    super(framework, raw(options), options);
  }

  //#endregion
}
