import {Encode, Decode} from '../src'
import * as utils from '../src/utils'
import codec from 'ripple-address-codec'

const account = 'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY'
const encodeDecodeTests = [
  {
    title: 'without tag',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2gYsjNFQLKYW33DzBm',
      testnet: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwLZzuUG5rZnaewsahi'
    }
  },
  {
    title: 'with null tag',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2gYsjNFQLKYW33DzBm',
      testnet: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwLZzuUG5rZnaewsahi'
    },
    tag: null
  },
  {
    title: 'with tag zero (0, number)',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2m4Er6SnvjVLpMWPjR',
      testnet: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwRQUBetPbyrvXSTuxU'
    },
    tag: 0
  },
  {
    title: 'with tag 13371337 (number)',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2qwGkhgc48zzcx6Gkr',
      testnet: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwVUDvp3vhpXbNhLwJi'
    },
    tag: 13371337
  },
  {
    title: 'with tag "13371337" (string)',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2qwGkhgc48zzcx6Gkr',
      testnet: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwVUDvp3vhpXbNhLwJi'
    },
    tag: '13371337'
  }
]

describe('XRPL Tagged Adress Codec', () => {

  describe('Ripple Address Codec', () => {
    it('should have the correct alphabet', () => {
      const alphabet = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'
      expect(codec.codecs.ripple.alphabet).toEqual(alphabet)
    })
  })

  describe('Utils', () => {
    it('should encode toHex', () => {
      const computed = utils.toHex(new Uint32Array([100, 3, 200]))
      expect(computed).toEqual('6403C8')
    })
    it('should encode toBytes', () => {
      const computed = utils.toBytes('abcd1234')
      expect(computed).toEqual(new Uint32Array([171, 205, 18, 52]))
    })
    it('should encode uInt32 to UInt32LE', () => {
      const computed = utils.uInt32_ToUInt32LE(1337)
      expect(computed).toEqual('3905000000000000')
    })
    it('should decode UInt32 to uInt32LE', () => {
      const computed = utils.uInt32LE_ToUInt32('3905000000000000')
      expect(computed).toEqual(1337)
    })
    it('should be able to compute a prefix', () => {
      const computed = utils.findPrefix('X', 29)
      expect(computed).toEqual([5, 68])
    })
  })

  describe('Errors', () => {
    it('should detect an invalid r-address', () => {
      expect(() => {
        const e = Encode({account: 'rXXXXXXXXXX'})
      }).toThrow('checksum_invalid')
    })
    it('should detect an invalid tagged livenet address', () => {
      expect(() => {
        const e = Decode('Xxxxxxxxxxxx')
      }).toThrow('checksum_invalid')
    })
    it('should detect an invalid tagged testnet address', () => {
      expect(() => {
        const e = Decode('Tttttttttttt')
      }).toThrow('checksum_invalid')
    })
  })

  const nets = ['livenet', 'testnet']
  nets.forEach(n => {
    const isTestnet = n === 'testnet'
    describe(n, () => {
      describe('Encoding (' + n + ')', () => {
        encodeDecodeTests.forEach(t => {
          it('should encode ' + t.title, () => {
            const encoded = Encode({
              account,
              tag: t.tag,
              testnet: isTestnet
            })
            const taggedAddress = isTestnet
              ? t.encoded.testnet
              : t.encoded.livenet
            expect(encoded).toEqual(taggedAddress)
          })
        })
      })

      describe('Decoding (' + n + ')', () => {
        encodeDecodeTests.forEach(t => {
          it('should decode ' + t.title, () => {
            const taggedAddress = isTestnet
              ? t.encoded.testnet
              : t.encoded.livenet
            const decoded = Decode(taggedAddress)
            expect(decoded).toEqual({
              account,
              tag: typeof t.tag === 'string' || typeof t.tag === 'number'
                ? String(t.tag)
                : null,
              testnet: isTestnet
            })
          })
        })
      })
    })
  })

})
