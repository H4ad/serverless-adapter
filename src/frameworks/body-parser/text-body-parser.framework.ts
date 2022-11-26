//#region Imports

import { OptionsText, text } from 'body-parser';
import { FrameworkContract } from '../../contracts';
import {
  BaseBodyParserFramework,
  BodyParserOptions,
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
    protected readonly framework: FrameworkContract<TApp>,
    options?: TextBodyParserFrameworkOptions,
  ) {
    super(framework, text(options), options);
  }

  //#endregion
}
