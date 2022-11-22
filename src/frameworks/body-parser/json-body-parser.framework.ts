//#region Imports

import { OptionsJson, json } from 'body-parser';
import { FrameworkContract } from '../../contracts';
import {
  BaseBodyParserFramework,
  BodyParserOptions,
} from './base-body-parser.framework';

//#endregion

/**
 * The body-parser options for application/json
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
    protected readonly framework: FrameworkContract<TApp>,
    options?: JsonBodyParserFrameworkOptions,
  ) {
    super(framework, json(options), options);
  }

  //#endregion
}
