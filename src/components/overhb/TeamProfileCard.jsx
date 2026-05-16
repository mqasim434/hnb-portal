import './TeamProfileCard.css'

/**
 * @param {{ name: string, role: string, bio: string, initials: string }} props
 */
export default function TeamProfileCard({ name, role, bio, initials }) {
  return (
    <article className="ohb-team-card">
      <div className="ohb-team-card__avatar" aria-hidden="true">
        {initials}
      </div>
      <h3 className="ohb-team-card__name">{name}</h3>
      <p className="ohb-team-card__role">{role}</p>
      <p className="ohb-team-card__bio">{bio}</p>
    </article>
  )
}
