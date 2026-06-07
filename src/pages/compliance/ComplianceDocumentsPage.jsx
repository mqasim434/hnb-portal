import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ComplianceDocumentForm from '../../components/ComplianceDocumentForm'
import PageHero from '../../components/marketing/PageHero'
import {
  COMPLIANCE_STATUS,
  COMPLIANCE_TYPE_CONFIG,
  CORE_COMPLIANCE_TYPES,
  complianceDisplayStatus,
} from '../../constants/compliance'
import { ACCOUNT_STATUS } from '../../constants/roles'
import { usePageSeo } from '../../hooks/usePageSeo'
import { fetchUserComplianceRecords } from '../../lib/compliance/records'
import '../auth/Auth.css'

/**
 * @param {{ variant?: 'auth' | 'portal' }} props
 */
export default function ComplianceDocumentsPage({ variant = 'auth' }) {
  usePageSeo({
    title: 'Compliance-documenten — H&B Service Group',
    description: 'Upload VOG, diploma, pas en andere compliance-documenten.',
    canonicalPath: variant === 'portal' ? '/portal/compliance' : '/auth/compliance',
    noIndex: true,
  })

  const { user, accountStatus } = useSelector((state) => state.auth)
  const [records, setRecords] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadRecords = useCallback(async () => {
    if (!user?.uid) return
    setLoading(true)
    setError(null)
    try {
      setRecords(await fetchUserComplianceRecords(user.uid))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Documenten laden mislukt.')
    } finally {
      setLoading(false)
    }
  }, [user?.uid])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  const isPending = accountStatus === ACCOUNT_STATUS.PENDING
  const optionalTypes = Object.keys(COMPLIANCE_TYPE_CONFIG).filter(
    (type) => !CORE_COMPLIANCE_TYPES.includes(type),
  )

  const approvedCount = CORE_COMPLIANCE_TYPES.filter(
    (type) => complianceDisplayStatus(records[type]) === COMPLIANCE_STATUS.APPROVED,
  ).length

  return (
    <main
      className={variant === 'portal' ? 'hnb-container' : 'auth-page'}
      style={variant === 'portal' ? { paddingBlock: 'var(--space-6)' } : undefined}
    >
      {variant === 'auth' ? (
        <PageHero
          variant="navy"
          eyebrow="Compliance"
          title="Documenten uploaden"
          lead="Upload uw VOG, diploma, pas en identiteitsbewijs. Pending freelancers kunnen dit alvast invullen terwijl H&B uw account beoordeelt."
        />
      ) : null}

      <section className={variant === 'portal' ? undefined : 'auth-panel hnb-container'}>
        {variant === 'portal' ? (
          <>
            <h1 className="hnb-type-section">Compliance-documenten</h1>
            <p className="hnb-type-subhead" style={{ marginTop: 'var(--space-3)', maxWidth: '42rem' }}>
              Houd uw VOG, diploma&apos;s en passen actueel. Documenten worden door H&amp;B gecontroleerd
              voordat ze op opdrachten worden gebruikt.
            </p>
          </>
        ) : null}

        {isPending ? (
          <div className="auth-alert auth-alert--info" role="status" style={{ marginBottom: 'var(--space-5)' }}>
            Uw account wacht nog op goedkeuring. U kunt documenten alvast uploaden zodat onboarding
            sneller verloopt.{' '}
            <Link to="/auth/pending">Terug naar statuspagina</Link>
          </div>
        ) : null}

        <p className="compliance-summary" style={{ marginTop: variant === 'portal' ? 'var(--space-4)' : 0 }}>
          Kerndocumenten goedgekeurd: <strong>{approvedCount}</strong> / {CORE_COMPLIANCE_TYPES.length}
        </p>

        {error ? (
          <div className="auth-alert auth-alert--error" role="alert" style={{ marginTop: 'var(--space-4)' }}>
            {error}
          </div>
        ) : null}

        {loading ? (
          <p style={{ marginTop: 'var(--space-5)' }}>Laden…</p>
        ) : (
          <>
            <div className="compliance-grid" style={{ marginTop: 'var(--space-5)' }}>
              <h2 className="hnb-type-subhead compliance-grid__heading">Verplichte documenten</h2>
              {CORE_COMPLIANCE_TYPES.map((type) => (
                <ComplianceDocumentForm
                  key={type}
                  type={type}
                  existing={records[type] ?? null}
                  onSaved={loadRecords}
                />
              ))}
            </div>

            <div className="compliance-grid" style={{ marginTop: 'var(--space-6)' }}>
              <h2 className="hnb-type-subhead compliance-grid__heading">Optioneel (rol/domein)</h2>
              {optionalTypes.map((type) => (
                <ComplianceDocumentForm
                  key={type}
                  type={type}
                  existing={records[type] ?? null}
                  onSaved={loadRecords}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
