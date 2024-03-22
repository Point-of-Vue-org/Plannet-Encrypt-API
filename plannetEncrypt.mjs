import { config } from 'dotenv'
config()

// const SECRET_KEY = process.env.SECRET_KEY || 'secret'

export function encrypt(str, secret) {
  let encrypted = ''
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const keyChar = secret[i % secret.length]
    const encryptedChar = String.fromCharCode(
      char.charCodeAt(0) + keyChar.charCodeAt(0)
    )
    encrypted += encryptedChar
  }
  return btoa(encrypted)
}

export function decrypt(str, secret) {
  if (!str) return null
  const aStr = atob(str)
  let decrypted = ''
  for (let i = 0; i < aStr.length; i++) {
    const char = aStr[i]
    const keyChar = secret[i % secret.length]
    const decryptedChar = String.fromCharCode(
      char.charCodeAt(0) - keyChar.charCodeAt(0)
    )
    decrypted += decryptedChar
  }
  return decrypted
}

export function hash(password) {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    let char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return btoa(hash.toString())
}
