import './NewsArticleList.css'

/**
 * @param {{ articles: { title: string, date?: string, excerpt: string }[] }} props
 */
export default function NewsArticleList({ articles }) {
  return (
    <ul className="ohb-news" aria-label="Nieuwsberichten">
      {articles.map((article) => (
        <li key={article.title} className="ohb-news__item">
          {article.date ? (
            <time className="ohb-news__date" dateTime={article.date}>
              {article.date}
            </time>
          ) : null}
          <h2 className="ohb-news__title">{article.title}</h2>
          <p className="ohb-news__excerpt">{article.excerpt}</p>
        </li>
      ))}
    </ul>
  )
}
