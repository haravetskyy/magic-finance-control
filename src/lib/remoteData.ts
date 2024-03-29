type Initial = {
  id: 'Initial'
}

const initial = <A>(): RemoteData<A> => ({
  id: 'Initial',
})

type Pending = {
  id: 'Pending'
}

const pending = <A>(): RemoteData<A> => ({
  id: 'Pending',
})

type Success<A> = {
  id: 'Success'
  data: A
}

const success = <A>(data: A): RemoteData<A> => ({
  id: 'Success',
  data,
})

type Failure = {
  id: 'Failure'
  error: Error
}

const failure = <A>(error: Error): RemoteData<A> => ({
  id: 'Failure',
  error,
})

export type RemoteData<A> = Initial | Pending | Success<A> | Failure

const isSuccess = <A>(rd: RemoteData<A>): rd is Success<A> => rd.id === 'Success'

type Pattern<A, B> = {
  onInitial: (rd: Initial) => B
  onPending: (rd: Pending) => B
  onSuccess: (rd: Success<A>) => B
  onFailure: (rd: Failure) => B
}

export const remoteData = {
  initial,
  pending,
  success,
  failure,
  isSuccess,
}

export const match = <A, B>(rd: RemoteData<A>, pattern: Pattern<A, B>): B => {
  switch (rd.id) {
    case 'Initial':
      return pattern.onInitial(rd)
    case 'Pending':
      return pattern.onPending(rd)
    case 'Success':
      return pattern.onSuccess(rd)
    case 'Failure':
      return pattern.onFailure(rd)
  }
}
