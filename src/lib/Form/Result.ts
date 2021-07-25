export type Result<S, F> = Success<S> | Failure<F>

type Success<T> = {
  id: 'Success'
  data: T
}

export const success = <T>(data: T): Result<T, never> => ({
  id: 'Success',
  data,
})

export function isSuccess<S, F>(r: Result<S, F>): r is Success<S> {
  return r.id === 'Success'
}

type Failure<T> = {
  id: 'Failure'
  data: T
}

export const failure = <T>(error: T): Result<never, T> => ({
  id: 'Failure',
  data: error,
})

export function isFailure<S, F>(r: Result<S, F>): r is Failure<F> {
  return r.id === 'Failure'
}

type Predicate<T> = (t: T) => boolean

export function fromPredicate<S, F>({
  predicate,
  onFailure,
}: {
  predicate: Predicate<S>
  onFailure: () => F
}): (value: S) => Result<S, F> {
  return value => (predicate(value) ? success(value) : failure(onFailure()))
}
