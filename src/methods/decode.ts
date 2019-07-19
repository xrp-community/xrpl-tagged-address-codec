import codec from 'ripple-address-codec'
import * as utils from '../utils'
import * as types from '../types'
import * as computed from '../computed'

export default function Decode(encodedDestination: string): types.Destination {
  const codecOptions: types.CodecOptions = computed.CodecOptions(encodedDestination)
  const decoded: Uint32Array = codec.codecs.ripple.decode(encodedDestination, codecOptions)
  const hex: string = utils.toHex(decoded)
  const accountHex: string = hex.slice(0, 40)
  const tagTypeHex: string = hex.slice(40, 42)
  const tagHex: string = hex.slice(42, 58)

  return {
    account: codec.encodeAddress(utils.toBytes(accountHex)),
    tag: tagTypeHex === '01'
      ? String(utils.uInt32LE_ToUInt32(tagHex))
      : null,
    testnet: computed.IsTestnet(encodedDestination)
  }
}
