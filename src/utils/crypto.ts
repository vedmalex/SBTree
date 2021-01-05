export function insecureRandomBytes(size) {
  const result = new Uint8Array(size)
  for (let i = 0; i < size; ++i) result[i] = Math.floor(Math.random() * 256)
  return result
}

function getRandomBytes() {
  let randomBytes = null
  try {
    // to have browser support
    randomBytes = require('crypto').randomBytes
  } catch (e) {
    // keep the fallback
  }
  if (randomBytes == null) {
    randomBytes = insecureRandomBytes
  }
  return randomBytes
}

function browserRandomBytes() {
  const randomBytes = (size) =>
    window.crypto.getRandomValues(new Uint8Array(size))
  return randomBytes
}

const isWindowContext = globalThis.window?.crypto?.getRandomValues

const randomBytes = isWindowContext ? browserRandomBytes : getRandomBytes()
export const generateRandId = (prefix = '') =>
  prefix + (Date.now().toString(16) + randomBytes(4).toString('hex'))
export const generateLeafId = () => generateRandId('l')
export const generateFieldTreeId = () => generateRandId('f')
export const generateTreeId = () => generateRandId('t')
export const generateNodeId = () => generateRandId('n')
export const generateRootId = () => generateRandId('r')
