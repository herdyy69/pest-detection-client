export function generateToken({
  length = 32,
}: {
  length?: number
} = {}) {
  const array = new Uint8Array(length) // 32 bytes of random data
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('') // Convert to hex
}
