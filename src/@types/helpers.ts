/**
 * Removes 'optional' attributes from a type's properties
 *
 * @breadcumb Types
 * @public
 */
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
