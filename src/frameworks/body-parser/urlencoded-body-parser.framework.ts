//#region Imports

import { OptionsUrlencoded, urlencoded } from 'body-parser';
import { FrameworkContract } from '../../contracts';
import {
  BaseBodyParserFramework,
  BodyParserOptions,
} from './base-body-parser.framework';

//#endregion

/**
 * The body parser options for application/x-www-form-urlencoded
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
    protected readonly framework: FrameworkContract<TApp>,
    options?: UrlencodedBodyParserFrameworkOptions,
  ) {
    super(framework, urlencoded(options), options);
  }

  //#endregion
}
