export const append = <A>(as: Array<A>, a: A): Array<A> => [...as, a]

export const prepend = <A>(as: Array<A>, a: A): Array<A> => [a, ...as]
