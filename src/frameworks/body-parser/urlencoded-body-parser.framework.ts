//#region Imports

import { type OptionsUrlencoded, urlencoded } from 'body-parser';
import { type FrameworkContract } from '../../contracts';
import {
  BaseBodyParserFramework,
  type BodyParserOptions,
} from './base-body-parser.framework';

//#endregion

/**
 * The body parser options for application/x-www-form-urlencoded
 *
 * @remarks {@link https://github.com/expressjs/body-parser#bodyparserurlencodedoptions}
 *
 * @breadcrumb Frameworks / BodyParserFramework / UrlencodedBodyParserFramework
 * @public
 */
export type UrlencodedBodyParserFrameworkOptions = OptionsUrlencoded &
  BodyParserOptions;

/**
 * The body-parser class used to parse application/x-www-form-urlencoded.
 *
 * @breadcrumb Frameworks / BodyParserFramework / UrlencodedBodyParserFramework
 * @public
 */
export class UrlencodedBodyParserFramework<TApp>
  extends BaseBodyParserFramework<TApp>
  implements FrameworkContract<TApp>
{
  //#region Constructor

  /**
   * Default Constructor
   */
  constructor(
    framework: FrameworkContract<TApp>,
    options?: UrlencodedBodyParserFrameworkOptions,
  ) {
    super(framework, urlencoded(options), options);
  }

  //#endregion
}
