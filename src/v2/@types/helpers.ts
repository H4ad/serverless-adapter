/**
 * Removes 'optional' attributes from a type's properties
 */
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
