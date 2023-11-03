'use strict'

import * as utils from '../utils'
import * as types from '../types'

const CodecOutputLength = 37

const IsTest = (destination: types.Destination | string): boolean => {
  if (typeof destination === 'string' && destination.match(/^T/)) {
    return true
  }
  if (typeof destination === 'object' && destination.test === true) {
    return true
  }
  return false
}

const CodecOptions = (destination: types.Destination | string): types.CodecOptions => {
  const char = IsTest(destination)
    ? 'T'
    : 'X'
  return {
    version: utils.findPrefix(char, CodecOutputLength),
    expectedLength: CodecOutputLength
  }
}

export {
  CodecOptions,
  IsTest
}
