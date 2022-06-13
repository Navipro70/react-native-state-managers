/* eslint-disable @typescript-eslint/no-explicit-any */
import { NetworkRequestError } from './NetworkRequestError'

export const interceptDefaultResponseError = async (error: any) => {
  if (error?.code === 'ECONNABORTED' || error.response.status === 408) {
    return timeOutError(error)
  }

  return Promise.reject(error)
}

async function timeOutError(error: any) {
  const requestError = new NetworkRequestError({
    message: 'Timeout for request',
    statusCode: error.response.status,
  })

  return Promise.reject(requestError)
}
