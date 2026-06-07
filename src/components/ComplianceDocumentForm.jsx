import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  COMPLIANCE_STATUS,
  COMPLIANCE_TYPE_CONFIG,
  complianceDisplayStatus,
  complianceStatusLabel,
} from '../constants/compliance'
import { submitComplianceRecord } from '../lib/compliance/records'
import '../pages/auth/Auth.css'

/**
 * @param {{
 *   type: string,
 *   existing?: {
 *     status?: string,
 *     expiryDate?: string | null,
 *     documentNumber?: string,
 *     fileUrl?: string,
 *     fileName?: string,
 *     adminNotes?: string,
 *   } | null,
 *   onSaved?: () => void,
 * }} props
 */
export default function ComplianceDocumentForm({ type, existing, onSaved }) {
  const config = COMPLIANCE_TYPE_CONFIG[type]
  const { user } = useSelector((state) => state.auth)
  const inputRef = useRef(null)

  const [documentNumber, setDocumentNumber] = useState(existing?.documentNumber ?? '')
  const [expiryDate, setExpiryDate] = useState(existing?.expiryDate ?? '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  if (!config) return null

  const displayStatus = existing ? complianceDisplayStatus(existing) : null
  const canSubmit =
    displayStatus !== COMPLIANCE_STATUS.APPROVED ||
    displayStatus === COMPLIANCE_STATUS.EXPIRED ||
    displayStatus === COMPLIANCE_STATUS.REJECTED

  async function handleSubmit(event) {
    event.preventDefault()
    const file = inputRef.current?.files?.[0]
    if (!file || !user?.uid) return

    if (config.requiresNumber && !documentNumber.trim()) {
      setError(`Vul ${config.numberLabel ?? 'het documentnummer'} in.`)
      return
    }
    if (config.requiresExpiry && !expiryDate) {
      setError('Vul een verloopdatum in.')
      return
    }

    setError(null)
    setSuccess(false)
    setUploading(true)
    try {
      await submitComplianceRecord(user.uid, type, {
        file,
        documentNumber,
        expiryDate: expiryDate || null,
        userEmail: user.email,
        userDisplayName: user.displayName,
      })
      setSuccess(true)
      if (inputRef.current) inputRef.current.value = ''
      onSaved?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload mislukt.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <article className="compliance-card">
      <div className="compliance-card__header">
        <h3 className="compliance-card__title">{config.label}</h3>
        {displayStatus ? (
          <span className={`compliance-badge compliance-badge--${displayStatus}`}>
            {complianceStatusLabel(displayStatus)}
          </span>
        ) : null}
      </div>
      <p className="compliance-card__hint">{config.hint}</p>

      {existing?.fileUrl ? (
        <p className="imagekit-upload__preview">
          Huidig bestand:{' '}
          <a href={existing.fileUrl} target="_blank" rel="noopener noreferrer">
            {existing.fileName || 'Bekijken'}
          </a>
        </p>
      ) : null}

      {existing?.adminNotes && displayStatus === COMPLIANCE_STATUS.REJECTED ? (
        <div className="auth-alert auth-alert--error" role="alert">
          <strong>Opmerking beheerder:</strong> {existing.adminNotes}
        </div>
      ) : null}

      {canSubmit ? (
        <form className="compliance-card__form" onSubmit={handleSubmit} noValidate>
          {config.requiresNumber ? (
            <div className="auth-field">
              <label htmlFor={`compliance-number-${type}`}>
                {config.numberLabel ?? 'Documentnummer'}
              </label>
              <input
                id={`compliance-number-${type}`}
                type="text"
                value={documentNumber}
                onChange={(event) => setDocumentNumber(event.target.value)}
                disabled={uploading}
              />
            </div>
          ) : null}

          {config.requiresExpiry ? (
            <div className="auth-field">
              <label htmlFor={`compliance-expiry-${type}`}>Geldig tot</label>
              <input
                id={`compliance-expiry-${type}`}
                type="date"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
                disabled={uploading}
              />
            </div>
          ) : null}

          <div className="auth-field">
            <label htmlFor={`compliance-file-${type}`}>Bestand (PDF of afbeelding, max. 10 MB)</label>
            <input
              ref={inputRef}
              id={`compliance-file-${type}`}
              type="file"
              accept="image/*,.pdf"
              disabled={uploading}
              required
            />
          </div>

          {error ? (
            <div className="auth-alert auth-alert--error" role="alert">
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="auth-alert auth-alert--success" role="status">
              Document ingediend — wacht op beoordeling door H&amp;B.
            </div>
          ) : null}

          <button
            type="submit"
            className="hnb-btn hnb-btn--freelancer"
            disabled={uploading}
          >
            {uploading ? 'Uploaden…' : existing ? 'Opnieuw indienen' : 'Indienen ter controle'}
          </button>
        </form>
      ) : (
        <p className="compliance-card__hint">
          Dit document is goedgekeurd
          {existing?.expiryDate ? ` (geldig tot ${existing.expiryDate})` : ''}.
        </p>
      )}
    </article>
  )
}
