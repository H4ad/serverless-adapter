//#region Imports

import { type OptionsText, text } from 'body-parser';
import type { FrameworkContract } from '../../contracts';
import {
  BaseBodyParserFramework,
  type BodyParserOptions,
} from './base-body-parser.framework';

//#endregion

/**
 * The body-parser options for text/plain
 *
 * @remarks {@link https://github.com/expressjs/body-parser#bodyparsertextoptions}
 *
 * @breadcrumb Frameworks / BodyParserFramework / TextBodyParserFramework
 * @public
 */
export type TextBodyParserFrameworkOptions = OptionsText & BodyParserOptions;

/**
 * The body-parser class used to parse text/plain.
 *
 * @breadcrumb Frameworks / BodyParserFramework / TextBodyParserFramework
 * @public
 */
export class TextBodyParserFramework<TApp>
  extends BaseBodyParserFramework<TApp>
  implements FrameworkContract<TApp>
{
  //#region Constructor

  /**
   * Default Constructor
   */
  constructor(
    framework: FrameworkContract<TApp>,
    options?: TextBodyParserFrameworkOptions,
  ) {
    super(framework, text(options), options);
  }

  //#endregion
}
