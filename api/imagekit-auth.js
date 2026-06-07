import { handleImageKitAuthRequest } from '../server/imagekitAuth.mjs'

/**
 * Vercel serverless route — deploy with IMAGEKIT_PRIVATE_KEY in project env.
 * Set VITE_IMAGEKIT_AUTH_ENDPOINT to this URL in production if the SPA is static-only.
 */
export default function handler(req, res) {
  handleImageKitAuthRequest(req, res)
}
