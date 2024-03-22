import express from 'express'
import { decrypt, encrypt, hash } from './plannetEncrypt.mjs'
import { config } from 'dotenv'
config()

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || 'secret'

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/api/hash', (req, res) => {
  const { key, text } = req.query
  if (key !== process.env.API_KEY) return res.status(401).send('Unauthorized')
  if (!text) return res.status(400).send('Text is required')
  res.status(200).send(hash(text));
})

app.get('/api/encrypt', (req, res) => {
  const { key, secret, text } = req.query
  if (key !== process.env.API_KEY) return res.status(401).send('Unauthorized')
  if (!text) return res.status(400).send('Text is required')
  res.status(200).send(encrypt(text, secret || SECRET_KEY));
})

app.get('/api/decrypt', (req, res) => {
  const { key, secret, text } = req.query
  if (key !== process.env.API_KEY) return res.status(401).send('Unauthorized')
  if (!text) return res.status(400).send('Text is required')
  res.status(200).send(decrypt(text, secret || SECRET_KEY));
})

app.listen(3022, () => {
  console.log('Server is running on port 3022');
})