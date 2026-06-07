import crypto from 'node:crypto'

/**
 * ImageKit client-upload auth params. Private key must stay server-side only.
 * @param {string} privateKey
 */
export function getImageKitAuthParameters(privateKey) {
  if (!privateKey) {
    throw new Error('IMAGEKIT_PRIVATE_KEY is not configured on the server.')
  }

  const token = crypto.randomUUID()
  const expire = Math.floor(Date.now() / 1000) + 2400
  const signature = crypto
    .createHmac('sha1', privateKey)
    .update(token + expire)
    .digest('hex')

  return { token, expire, signature }
}

/**
 * Minimal HTTP handler for dev (Vite) and serverless (Vercel/Netlify).
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 * @param {{ privateKey?: string, allowedOrigin?: string }} [options]
 */
export function handleImageKitAuthRequest(req, res, options = {}) {
  const privateKey = options.privateKey ?? process.env.IMAGEKIT_PRIVATE_KEY
  const allowedOrigin =
    options.allowedOrigin ?? process.env.ALLOWED_ORIGIN ?? process.env.VITE_SITE_URL ?? '*'

  if (allowedOrigin !== '*' && req.headers.origin) {
    if (req.headers.origin === allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
      res.setHeader('Vary', 'Origin')
    }
  } else if (allowedOrigin === '*') {
    res.setHeader('Access-Control-Allow-Origin', '*')
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  try {
    const params = getImageKitAuthParameters(privateKey)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    res.end(JSON.stringify(params))
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'Auth parameter generation failed.',
      }),
    )
  }
}
