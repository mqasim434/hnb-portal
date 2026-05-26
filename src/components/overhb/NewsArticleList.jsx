import { Link } from 'react-router-dom'
import './NewsArticleList.css'

/**
 * @param {{
 *   articles: { slug: string, monthLabel: string, isoDate: string, title: string, excerpt: string }[]
 * }} props
 */
export default function NewsArticleList({ articles }) {
  return (
    <ul className="ohb-news" aria-label="Nieuwsberichten">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link to={`/over-hb/nieuws/${article.slug}`} className="ohb-news__card">
            <time className="ohb-news__date" dateTime={article.isoDate}>
              {article.monthLabel}
            </time>
            <h2 className="ohb-news__title">{article.title}</h2>
            <p className="ohb-news__excerpt">{article.excerpt}</p>
            <span className="ohb-news__readmore">Lees meer →</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
