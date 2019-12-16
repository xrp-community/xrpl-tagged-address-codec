const {Encode, Decode} = require('../dist/')

const tagged = Encode({
  account: 'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY',
  tag: 1337
})
console.log('Encoded', tagged)

const untagged = Decode(tagged)
console.log('Decoded', untagged)

console.log()

const taggedTestnet = Encode({
  account: 'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY',
  tag: 1337,
  test: true
})
console.log('Encoded for Testnet', taggedTestnet)

const untaggedTestnet = Decode(taggedTestnet)
console.log('Decoded for Testnet', untaggedTestnet)

console.log()
