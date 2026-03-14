import { groq } from 'next-sanity'

export const headerQuery = groq`
  *[_type == "header"][0] {
    navLinks[] | order(order asc) {
      label,
      href
    },
    megaMenuColumns[] | order(order asc) {
      title,
      description,
      cardColor,
      subcategories[] {
        label,
        items[] {
          label,
          "href": select(
            defined(course->slug.current) => "/courses/" + course->slug.current,
            defined(slug.current) => "/courses/" + slug.current,
            defined(href) => href,
            "#"
          )
        }
      }
    },
    megaMenuFooter {
      links[] | order(order asc) {
        label,
        href
      },
      socialLinks[] | order(order asc) {
        platform,
        href
      }
    }
  }
`