'use strict'

type Destination = {
  account: string
  tag?: null | number | string
  networkID?: null | number | string
  test?: boolean
}

type CodecOptions = {
  version: number | Uint32Array
  expectedLength: number
}

export {
  Destination,
  CodecOptions
}
