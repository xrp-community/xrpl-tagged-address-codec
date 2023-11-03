import {Encode, Decode} from '../src'
import * as utils from '../src/utils'
import codec from 'ripple-address-codec'

const account = 'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY'
const encodeDecodeTests = [
  {
    title: 'without tag',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2gYsjNFQLKYW33DzBm',
      test: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwLZzuUG5rZnaewsahi'
    },
    networkID: null
  },
  {
    title: 'with null tag',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2gYsjNFQLKYW33DzBm',
      test: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwLZzuUG5rZnaewsahi'
    },
    tag: null,
    networkID: null
  },
  {
    title: 'with tag zero (0, number)',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2m4Er6SnvjVLpMWPjR',
      test: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwRQUBetPbyrvXSTuxU'
    },
    tag: 0,
    networkID: null
  },
  {
    title: 'with tag 13371337 (number)',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2qwGkhgc48zzcx6Gkr',
      test: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwVUDvp3vhpXbNhLwJi'
    },
    tag: 13371337,
    networkID: null
  },
  {
    title: 'with tag "13371337" (string)',
    encoded: {
      livenet: 'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2qwGkhgc48zzcx6Gkr',
      test: 'TVd2rqMkYL2AyS97NdELcpeiprNBjwVUDvp3vhpXbNhLwJi'
    },
    tag: '13371337',
    networkID: null
  }
]

describe('XRPL Tagged Adress Codec', () => {

  describe('Ripple Address Codec', () => {
    it('should have the correct alphabet', () => {
      const alphabet = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'
      expect(codec.codecs.ripple.alphabet).toEqual(alphabet)
    })
  })

  describe('Error handling', () => {
    it('should only accept an object', () => {
      expect(() => {
        // @ts-ignore
        const e = Encode(null)
      }).toThrow('Input should contain object')
    })
    it('should rquire the `account` key', () => {
      expect(() => {
        // @ts-ignore
        const e = Encode({address: 'x'})
      }).toThrow('Input should contain `account`')
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
      expect(computed).toEqual('39050000')
    })
    it('should decode UInt32 to uInt32LE', () => {
      const computed = utils.uInt32LE_ToUInt32('39050000')
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
    it('should detect an invalid tagged test address', () => {
      expect(() => {
        const e = Decode('Tttttttttttt')
      }).toThrow('checksum_invalid')
    })
  })

  const nets = ['livenet', 'test']
  nets.forEach(n => {
    const isTest = n === 'test'
    describe(n, () => {
      describe('Encoding (' + n + ')', () => {
        encodeDecodeTests.forEach(t => {
          it('should encode ' + t.title, () => {
            const encoded = Encode({
              account,
              tag: t.tag,
              test: isTest
            })
            const taggedAddress = isTest
              ? t.encoded.test
              : t.encoded.livenet
            expect(encoded).toEqual(taggedAddress)
          })
        })
      })

      describe('Decoding (' + n + ')', () => {
        encodeDecodeTests.forEach(t => {
          it('should decode ' + t.title, () => {
            const taggedAddress = isTest
              ? t.encoded.test
              : t.encoded.livenet
            const decoded = Decode(taggedAddress)
            expect(decoded).toEqual({
              account,
              tag: typeof t.tag === 'string' || typeof t.tag === 'number'
                ? String(t.tag)
                : null,
              test: isTest,
              networkID: null
            })
          })
        })
      })
    })
  })

})
