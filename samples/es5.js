const {Encode, Decode} = require('../dist/')

const tagged = Encode({
  account: 'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY',
  tag: 1337
})
console.log('Encoded', tagged)

const untagged = Decode(tagged)
console.log('Decoded', untagged)

console.log()

const taggedTest = Encode({
  account: 'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY',
  tag: 1337,
  test: true
})
console.log('Encoded for test address', taggedTest)

const untaggedTest = Decode(taggedTest)
console.log('Decoded for test address', untaggedTest)

console.log()
