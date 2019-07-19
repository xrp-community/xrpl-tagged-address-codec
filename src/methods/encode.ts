import codec from 'ripple-address-codec'
import * as utils from '../utils'
import * as types from '../types'
import * as computed from '../computed'

export default function Encode(destination: types.Destination): string {
  const account: string = destination.account
  const tag: null | number = destination.tag === null || destination.tag === undefined
    ? null
    : Number(destination.tag)

  const accountHex: string = utils.toHex(codec.decodeAddress(account))
  const tagTypeHex: string = tag === null
    ? '00'
    : '01'
  const tagHex: string = utils.uInt32_ToUInt32LE(tag || 0)
  const bytes: Uint32Array = utils.toBytes(accountHex + tagTypeHex + tagHex)

  return codec.codecs.ripple.encode(bytes, computed.CodecOptions(destination))
}
