declare module 'ripple-address-codec' {
  export type EncodingOptions = {
    version: number | Uint32Array
    expectedLength: number
  }

  export type Codec = {
    alphabet: string
    codec: object
    base: number
    encode: (bytes: Uint32Array, options?: EncodingOptions) => string
    decode: (address: string, options?: EncodingOptions) => Uint32Array
    decodeRaw: (template: string) => Uint32Array
  }

  export type Codecs = {
    ripple: Codec
  }

  export const codecs: Codecs
  export const decodeAddress: (accountAddress: string) => Uint32Array
  export const encodeAddress: (account: Uint32Array) => string
  export const isValidAddress: (accountAddress: string) => Uint32Array
}
