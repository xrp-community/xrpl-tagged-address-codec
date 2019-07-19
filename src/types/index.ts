'use strict'

type Destination = {
  account: string
  tag?: null | number | string
  testnet?: boolean
}

type CodecOptions = {
  version: number | Uint32Array
  expectedLength: number
}

export {
  Destination,
  CodecOptions
}
