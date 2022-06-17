/**
 * Removes 'optional' attributes from a type's properties
 *
 * @breadcrumb Types
 * @public
 */
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
