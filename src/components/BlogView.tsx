import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { blogArticles, type BlogArticle } from '../data/blogArticles';

export function BlogView() {
  const { i18n } = useTranslation();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const isEn = i18n.language === 'en';

  const selected = selectedSlug
    ? blogArticles.find(a => a.slug === selectedSlug) ?? null
    : null;

  return (
    <div className="blog-view">
      {!selected ? (
        <BlogList articles={blogArticles} isEn={isEn} onSelect={setSelectedSlug} />
      ) : (
        <BlogArticleView article={selected} isEn={isEn} onBack={() => setSelectedSlug(null)} />
      )}
    </div>
  );
}

function BlogList({ articles, isEn, onSelect }: {
  articles: BlogArticle[];
  isEn: boolean;
  onSelect: (slug: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <p className="blog-intro">{t('blog.intro')}</p>
      <div className="blog-grid">
        {articles.map(article => (
          <button
            key={article.slug}
            className="blog-card"
            onClick={() => onSelect(article.slug)}
          >
            <h3 className="blog-card__title">
              {isEn ? article.titleEn : article.title}
            </h3>
            <p className="blog-card__desc">
              {isEn ? article.descriptionEn : article.description}
            </p>
            <div className="blog-card__meta">
              <span className="blog-card__date">{article.date}</span>
              <div className="blog-card__tags">
                {article.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function BlogArticleView({ article, isEn, onBack }: {
  article: BlogArticle;
  isEn: boolean;
  onBack: () => void;
}) {
  const { t } = useTranslation();

  return (
    <article className="blog-article">
      <button className="blog-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {t('blog.backToList')}
      </button>

      <h2 className="blog-article__title">
        {isEn ? article.titleEn : article.title}
      </h2>

      <div className="blog-article__meta">
        <span className="blog-card__date">{article.date}</span>
        <div className="blog-card__tags">
          {article.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div
        className="blog-article__body"
        dangerouslySetInnerHTML={{ __html: isEn ? article.bodyEn : article.body }}
      />
    </article>
  );
}
