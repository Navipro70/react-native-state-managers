/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosBase, { AxiosInstance } from 'axios'

import { interceptDefaultResponseError } from './utils'

class NetworkClientClass {
  instance: AxiosInstance

  constructor(url: string) {
    const baseURL = url
    this.instance = axiosBase.create({ baseURL })
    this.instance.interceptors.response.use((response) => response, interceptDefaultResponseError)
  }
}

export const NetworkClient = new NetworkClientClass('https://jsonplaceholder.typicode.com/')
