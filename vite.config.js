import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { handleImageKitAuthRequest } from './server/imagekitAuth.mjs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      {
        name: 'imagekit-auth-dev',
        configureServer(server) {
          server.middlewares.use('/api/imagekit-auth', (req, res) => {
            handleImageKitAuthRequest(req, res, {
              privateKey: env.IMAGEKIT_PRIVATE_KEY,
              allowedOrigin: env.ALLOWED_ORIGIN || env.VITE_SITE_URL || '*',
            })
          })
        },
      },
      react(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined
            if (id.includes('firebase')) return 'firebase'
            if (id.includes('react-router')) return 'react-router'
            if (id.includes('@reduxjs') || id.includes('react-redux')) return 'redux'
            if (id.includes('react-icons')) return 'icons'
            if (
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react/')
            ) {
              return 'react-vendor'
            }
            return undefined
          },
        },
      },
    },
  }
})
