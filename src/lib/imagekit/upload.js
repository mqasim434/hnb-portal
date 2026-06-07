import { imagekitConfig, isImageKitConfigured } from './config'

const MAX_BYTES = 10 * 1024 * 1024
const UPLOAD_URL = 'https://upload.imagekit.io/api/v1/files/upload'

/**
 * @returns {Promise<{ token: string, expire: number, signature: string }>}
 */
async function fetchAuthParameters() {
  const isRelativeEndpoint = imagekitConfig.authEndpoint.startsWith('/')
  const response = await fetch(imagekitConfig.authEndpoint, {
    method: 'GET',
    ...(isRelativeEndpoint ? { credentials: 'same-origin' } : {}),
  })

  if (!response.ok) {
    throw new Error(
      'Upload-authenticatie mislukt. Controleer IMAGEKIT_PRIVATE_KEY en het auth-endpoint.',
    )
  }

  const data = await response.json()
  if (!data?.token || !data?.expire || !data?.signature) {
    throw new Error('Ongeldig antwoord van het ImageKit auth-endpoint.')
  }

  return data
}

/**
 * @param {string} uid
 * @param {File} file
 * @param {string} [category]
 * @returns {Promise<{ url: string, fileId: string, name: string, imagekitPath: string }>}
 */
export async function uploadUserFile(uid, file, category = 'compliance') {
  if (!isImageKitConfigured()) {
    throw new Error(
      'ImageKit is niet geconfigureerd. Vul VITE_IMAGEKIT_PUBLIC_KEY en VITE_IMAGEKIT_URL_ENDPOINT in.',
    )
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Bestand is te groot. Maximum is 10 MB.')
  }

  const { token, expire, signature } = await fetchAuthParameters()
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const folder = `/hnb-portal/users/${uid}/${category}`

  const body = new FormData()
  body.append('file', file)
  body.append('fileName', safeName)
  body.append('publicKey', imagekitConfig.publicKey)
  body.append('signature', signature)
  body.append('token', token)
  body.append('expire', String(expire))
  body.append('folder', folder)
  body.append('useUniqueFileName', 'true')

  const response = await fetch(UPLOAD_URL, { method: 'POST', body })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || data?.error || 'Upload naar ImageKit mislukt.')
  }

  return {
    url: data.url,
    fileId: data.fileId,
    name: file.name,
    imagekitPath: data.filePath ?? folder,
  }
}
