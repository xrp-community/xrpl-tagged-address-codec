# XRPL Tagged Address Codec [![npm version](https://badge.fury.io/js/xrpl-tagged-address-codec.svg?1)](https://www.npmjs.com/xrpl-tagged-address-codec)

#### Encode and Decode an XRPL account address and destination tag to/from X-formatted (tagged) address.

Destination tags provide a way for exchanges, payment processors, corporates or entities which accept incoming payments, escrows, checks and similar transcations to use a single receiving wallet while being able to disambiguate incoming transactions by instructing the senders to include a destination tag.

This package allows encoding and decoding from an XRPL address and destination tag to / from 'Tagged Addresses', containing both the destination account address and tag in one string. This way users can simply copy-paste the string, eliminating possible user error when copying / entering a numeric destination tag.

#### Hopefully all exchanges, wallets & other software using destination tags will implement this address codec. A migration period will be required to allow users to enter both address formats.

#### The website [https://xrpaddress.info](https://xrpaddress.info/) is available for users, exchanges and developers to provide some context and best practices.

## Use

 - [Browserified sample](https://jsfiddle.net/WietseWind/05rpvbag/)
 - [RunKit sample in node](https://runkit.com/wietsewind/5cbf111b51e3ee00127b2b59)

### 1. Import

##### Node

```
const {Encode, Decode} = require('xrpl-tagged-address-codec')
```
... and use: `Encode()` / `Decode()` or:

```
const codec = require('xrpl-tagged-address-codec')
```

... and use: `codec.Encode()` / `codec.Decode()`


##### TypeScript
```
import {Encode, Decode} from 'xrpl-tagged-address-codec'
```

... and use: `Encode()` / `Decode()` or:

```
import * as codec from 'xrpl-tagged-address-codec'
```

... and use: `codec.Encode()` / `codec.Decode()`


### 2. Encode / Decode

#### Encode a separate account address and destination tag:

```
const tagged = Encode({
  account: 'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY',
  tag: 1337,
  testnet: false
})
```

The output will be a tagged address (string). The `tag` and `testnet` can be omitted, rendering `tag` to be **null** and `testnet` to be **false**.


#### Decode a tagged address:

```
const tagged = 'XVLhHMPHU98es4dbozjVtdWzVrDjtV8xvjGQTYPiAx6gwDC'
const untagged = Decode(tagged)

```

The output will be a destination object containing the untagged address (r....), the destination tag (null or a string containing the destination tag) and a testnet (bool) indicator.

## Development

Run npm run prepublish to clean, lint, test and build. Or just run npm run build, npm run test or npm run lint.

Tests are in `./test`. Run `tsc -w` if you want are developing and want to auto-build to `./dist` when you make changes on the fly.

Scripts:

 - Build: `npm run build`, output: `./dist`
 - Test: `npm run test`
 - Lint: `npm run lint`
 - Clean, test, lint and build: `npm run prepublish`
 - Browserify: `npm run browserify`, output: `dist/xrpl-tagged-address-codec-browser.js`

## Credits

This concept is based on the [concept](https://github.com/xrp-community/standards-drafts/issues/6) from [@nbougalis](https://github.com/nbougalis)
 
Big thanks to [@sublimator](https://github.com/sublimator) for his fiddles, ideas and fixes and [@intelliot](https://github.com/intelliot) for the idea of adding an `X` / `T` prefix for (new) address recognizability. 
