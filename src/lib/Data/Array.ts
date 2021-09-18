export const append = <A>(as: Array<A>, a: A): Array<A> => [...as, a]

export const prepend = <A>(as: Array<A>, a: A): Array<A> => [a, ...as]

export type NonEmptyArray<A> = Array<A> & { 0: A }

export function of<A>(a: A): NonEmptyArray<A> {
  return [a]
}

export function isNonEmpty<A>(as: Array<A>): as is NonEmptyArray<A> {
  return as.length > 0
}

export function head<A>(as: Array<A>): A | null {
  return as[0] || null
}
