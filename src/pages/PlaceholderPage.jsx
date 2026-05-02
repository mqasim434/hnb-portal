export default function PlaceholderPage({ title }) {
  return (
    <main className="hnb-container" style={{ padding: '4rem 0' }}>
      <h1 className="hnb-type-section">{title}</h1>
      <p
        className="hnb-type-subhead"
        style={{ marginTop: '1rem', maxWidth: '42rem' }}
      >
        Placeholder page for H&amp;B Service Group — content coming soon.
      </p>
    </main>
  )
}
