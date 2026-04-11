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
            defined(course->slug.current) => "/courses/" + select(
              course->slug.current in ["plc-total-industrial", "programmable-logic-controllers", "city-guilds-programmable-logic", "scada", "robotic", "5-day-beginner-industrial-robotics"] || 
              course->slug.current match "programmable-logic-controllers*" ||
              course->slug.current match "*plc*" ||
              course->slug.current match "*scada*" ||
              course->slug.current match "*robotic*" => "plc",
              course->slug.current in ["f-gas", "hydrocarbon", "pipework-brazing", "refrigeration", "total-air-conditioning"] || 
              course->slug.current match "*f-gas*" ||
              course->slug.current match "*refrigeration*" ||
              course->slug.current match "*air-con*" => "aircon-refrigeration",
              "electrical"
            ) + "/" + course->slug.current,
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