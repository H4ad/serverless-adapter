//#region Imports

import { type OptionsJson, json } from 'body-parser';
import { type FrameworkContract } from '../../contracts';
import {
  BaseBodyParserFramework,
  type BodyParserOptions,
} from './base-body-parser.framework';

//#endregion

/**
 * The body-parser options for application/json
 *
 * @remarks {@link https://github.com/expressjs/body-parser#bodyparserjsonoptions}
 *
 * @breadcrumb Frameworks / BodyParserFramework / JsonBodyParserFramework
 * @public
 */
export type JsonBodyParserFrameworkOptions = OptionsJson & BodyParserOptions;

/**
 * The body-parser class used to parse application/json.
 *
 * @breadcrumb Frameworks / BodyParserFramework / JsonBodyParserFramework
 * @public
 */
export class JsonBodyParserFramework<TApp>
  extends BaseBodyParserFramework<TApp>
  implements FrameworkContract<TApp>
{
  //#region Constructor

  /**
   * Default Constructor
   */
  constructor(
    framework: FrameworkContract<TApp>,
    options?: JsonBodyParserFrameworkOptions,
  ) {
    super(framework, json(options), options);
  }

  //#endregion
}
