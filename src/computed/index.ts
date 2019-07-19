'use strict'

import * as utils from '../utils'
import * as types from '../types'

const CodecOutputLength = 29

const IsTestnet = (destination: types.Destination | string): boolean => {
  if (typeof destination === 'string' && destination.match(/^T/)) {
    return true
  }
  if (typeof destination === 'object' && destination.testnet === true) {
    return true
  }
  return false
}

const CodecOptions = (destination: types.Destination | string): types.CodecOptions => {
  const char = IsTestnet(destination)
    ? 'T'
    : 'X'
  return {
    version: utils.findPrefix(char, CodecOutputLength),
    expectedLength: CodecOutputLength
  }
}

export {
  CodecOptions,
  IsTestnet
}
