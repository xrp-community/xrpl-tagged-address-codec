import codec from 'ripple-address-codec'
import * as utils from '../utils'
import * as types from '../types'
import * as computed from '../computed'

export default function Decode(encodedDestination: string): types.Destination {
  const decoded: Uint32Array = codec.codecs.ripple.decode(encodedDestination)
  const hex: string = utils.toHex(decoded)
  const cksum: string = utils.makeChecksum(hex.slice(0,62))
  const isTest: boolean = hex.slice(0,4) === '0493'
  if ((hex.slice(0,4) !== '0544' && !isTest) || hex.length !== 70 || hex.slice(62, 70) !== cksum) {
    throw new Error('checksum_invalid')
  }
    /*
      throw new Error(
          'Invalid X-Address when decoding ' +
              encodedDestination + ' front: ' + hex.slice(0,4) + ' len: ' + hex.length
        + ' checksum: ' + hex.slice(62, 70) + ' computed: ' + cksum
      );
     */
  const accountHex: string = hex.slice(4, 44)
  const tagTypeHex: string = hex.slice(44, 46)
  const tagHex: string = hex.slice(46, 54)
  const nidHex: string = hex.slice(54, 62)

  return {
    account: codec.encodeAddress(utils.toBytes(accountHex)),
    tag: tagTypeHex === '01' || tagTypeHex === '81'
      ? String(utils.uInt32LE_ToUInt32(tagHex))
      : null,
    networkID: tagTypeHex === '80' || tagTypeHex === '81'
      ? String(utils.uInt32LE_ToUInt32(nidHex))
      : null,
    test: isTest
  }
}
