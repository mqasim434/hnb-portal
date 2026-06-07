export const imagekitConfig = {
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY ?? '',
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT ?? '',
  authEndpoint: import.meta.env.VITE_IMAGEKIT_AUTH_ENDPOINT ?? '/api/imagekit-auth',
}

export function isImageKitConfigured() {
  return Boolean(imagekitConfig.publicKey && imagekitConfig.urlEndpoint)
}
