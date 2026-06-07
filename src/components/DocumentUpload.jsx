import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { uploadUserFile } from '../lib/imagekit/upload'
import '../pages/auth/Auth.css'

/**
 * @param {{
 *   category?: string,
 *   accept?: string,
 *   label?: string,
 *   hint?: string,
 *   disabled?: boolean,
 *   onUploaded?: (result: { url: string, fileId: string, name: string, imagekitPath: string }) => void,
 * }} props
 */
export default function DocumentUpload({
  category = 'compliance',
  accept = 'image/*,.pdf',
  label = 'Bestand uploaden',
  hint = 'PDF of afbeelding, max. 10 MB.',
  disabled = false,
  onUploaded,
}) {
  const inputRef = useRef(null)
  const { user } = useSelector((state) => state.auth)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [lastFile, setLastFile] = useState(null)

  async function handleChange(event) {
    const file = event.target.files?.[0]
    if (!file || !user?.uid) return

    setError(null)
    setUploading(true)
    try {
      const result = await uploadUserFile(user.uid, file, category)
      setLastFile(result)
      onUploaded?.(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload mislukt.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="imagekit-upload">
      <span className="imagekit-upload__label">{label}</span>
      {hint ? <p className="imagekit-upload__hint">{hint}</p> : null}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled || uploading || !user?.uid}
        onChange={handleChange}
      />
      {uploading ? <p className="imagekit-upload__hint">Uploaden…</p> : null}
      {error ? (
        <div className="auth-alert auth-alert--error" role="alert">
          {error}
        </div>
      ) : null}
      {lastFile ? (
        <p className="imagekit-upload__preview">
          Geüpload:{' '}
          <a href={lastFile.url} target="_blank" rel="noopener noreferrer">
            {lastFile.name}
          </a>
        </p>
      ) : null}
    </div>
  )
}
