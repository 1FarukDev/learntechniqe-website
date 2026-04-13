/** Slugs only — for sitemap generation. */
export const BLOG_SLUGS_FOR_SITEMAP_QUERY = `*[_type == "blog" && isPublished == true]{ "slug": slug.current }`;

/** Lightweight index for merging with legacy and paginating without loading every full post. */
export const SANITY_BLOG_INDEX_QUERY = `*[_type == "blog" && isPublished == true]{
  "slug": slug.current,
  date,
  category,
  highlighted
}`;

/** Full card fields for posts whose slugs appear on the current page (small $slugs set). */
export const BLOG_CARDS_BY_SLUGS_QUERY = `*[_type == "blog" && isPublished == true && slug.current in $slugs] {
  _id,
  title,
  slug,
  author,
  date,
  category,
  coverImage {
    asset ->,
    alt,
    hotspot
  },
  highlighted
}`;

export const BLOGS_BY_CATEGORY_QUERY = `*[_type == "blog" && isPublished == true && category == $category] | order(date desc) {
  _id,
  title,
  slug,
  author,
  date,
  category,
  coverImage {
    asset ->,
    alt,
    hotspot
  },
  highlighted
}`;

export const BLOG_BY_SLUG_QUERY = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  date,
  category,
  isPublished,
  heroImage {
    asset ->,
    alt,
    hotspot
  },
  heroTitle,
  coverImage {
    asset ->,
    alt,
    hotspot
  },
  body,
  highlighted
}`;

export const RECENT_BLOGS_QUERY = `*[_type == "blog" && isPublished == true] | order(date desc) [0...7] {
  _id,
  title,
  slug
}`;

export const RELATED_BLOGS_QUERY = `*[_type == "blog" && isPublished == true && category == $category && _id != $currentId] | order(date desc) [0...6] {
  _id,
  title,
  slug,
  author,
  date,
  category,
  coverImage {
    asset ->,
    alt,
    hotspot
  },
  highlighted
}`;
