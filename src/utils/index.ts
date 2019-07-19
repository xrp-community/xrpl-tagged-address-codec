'use strict'

import codec from 'ripple-address-codec'

function toHex (bytes: Uint32Array): string {
  return Buffer.from(bytes).toString('hex').toUpperCase()
}

function toBytes (hex: string): Uint32Array {
  return new Uint32Array(Buffer.from(hex, 'hex').toJSON().data)
}

function uInt32_ToUInt32LE (integer: number): string {
  const buf = Buffer.alloc(8)
  buf.writeUInt32LE(integer, 0)
  return buf.toString('hex').toUpperCase()
}

function uInt32LE_ToUInt32 (hex: string): number {
  return Buffer.from(hex, 'hex').readUInt32LE(0)
}

function findPrefix (desiredPrefix: string, payloadLength: number): number | Uint32Array {
  // Thanks @sublimator

  const rippleCodec = codec.codecs.ripple

  if (rippleCodec.base !== 58) {
    throw new Error('Only works for base58')
  }
  const factor = Math.log(256) / Math.log(rippleCodec.base)
  const totalLength = payloadLength + 4 // for checksum
  const chars = totalLength * factor
  const requiredChars = Math.ceil(chars + 0.2)
  const alphabetPosition = Math.floor((rippleCodec.alphabet.length) / 2) - 1
  const padding = rippleCodec.alphabet[alphabetPosition]
  const rcPad = new Array(requiredChars + 1).join(padding)
  const template = desiredPrefix + rcPad
  const bytes = rippleCodec.decodeRaw(template)
  const version = bytes.slice(0, -totalLength)
  return version
}

export {
  toHex,
  toBytes,
  uInt32_ToUInt32LE,
  uInt32LE_ToUInt32,
  findPrefix
}
