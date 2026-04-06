export const ALL_BLOGS_QUERY = `*[_type == "blog" && isPublished == true] | order(date desc) {
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
