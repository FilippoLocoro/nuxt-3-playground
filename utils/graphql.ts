import { format, parseISO } from 'date-fns';

export const PageModelContentFieldFragment = `
  fragment PageModelContentFieldFragment on PageModelContentField {
    blocks
    links
    value
  }
`;
export const ActivityModelContentFieldFragment = `
  fragment ActivityModelContentFieldFragment on ActivityModelContentField {
    blocks
    links
    value
  }
`;

export const FileFieldFragment = `
  fragment FileFieldFragment on FileField {
    height
    url
    width
    title
    format
    size
    alt
    responsiveImage {
      aspectRatio
      alt
      base64
      bgColor
      height
      sizes
      src
      srcSet
      title
      webpSrcSet
      width
    }
  }
`;

export const seoMetaTagsFields = `
  fragment seoMetaTagsFields on Tag {
    attributes
    content
    tag
  }
`;

export const siteQuery = `
  query Site($locale: SiteLocale!) {
    _site(locale: $locale) {
      locales
      noIndex
      favicon: faviconMetaTags {
        ...seoMetaTagsFields
      }
      globalSeo(locale: $locale) {
        siteName
        titleSuffix
        twitterAccount
        facebookPageUrl
        fallbackSeo {
          title
          description
          image {
            ...FileFieldFragment
          }
        }
      }
    }
  }
  ${FileFieldFragment}
  ${seoMetaTagsFields}
`;

export const AllPagesLinks = `
  query AllPagesLinks($locale: SiteLocale!) {
    allPages(locale: $locale) {
      id
      title(locale: $locale)
      slug
      menuPosition
      activities {
        slug
        title
        category
      }
    }
  }
`;

export const PageBySlugQuery = `
query PageBySlug($slug: String!, $locale: SiteLocale!) {
  page(filter: {slug: {eq: $slug}}, locale: $locale) {
    id
    slug
    title(locale: $locale)
    blocks(locale: $locale) {
      ... on ContactRecord {
        email
        telephone
        title
        _modelApiKey
        content {
          blocks
          links
          value
        }
        _isValid
      }
      ... on ContentRecord {
        linkTo
        title
        _modelApiKey
        content {
          blocks
          links
          value
        }
        _isValid
      }
      ... on HeroRecord {
        _isValid
        _modelApiKey
        id
        title
        subtitle
        content {
          blocks
          links
          value
        }
        image {
          ...FileFieldFragment
        }
      }
      ... on LocationRecord {
        headquarter {
          longitude
          latitude
        }
        content {
          blocks
          links
          value
        }
        _modelApiKey
        _isValid
        title
      }
      ... on ImagecontentRecord {
        linkTo
        title
        image {
          ...FileFieldFragment
        }
        _modelApiKey
        content {
          blocks
          links
          value
        }
      }
      ... on VideocontentRecord {
        _modelApiKey
        title
        content {
          blocks
          links
          value
        }
      }
    }
  }
}
${FileFieldFragment}
`;

export const pageQuery = `
query Page($slug: String!, $locale: SiteLocale!) {
  page(locale: $locale, filter: {slug: {eq: $slug}}) {
    slug
    title
    id
    featuredImage {
      ...FileFieldFragment
    }
    content {
      ...PageModelContentFieldFragment
    }
  }
}
${PageModelContentFieldFragment}
${FileFieldFragment}
`;

export const AllActivitiesByCategoryQuery = `
query AllActivitiesByCategory($locale: SiteLocale!, $category: String) {
  allActivities(filter: {category: {eq: $category}}, locale: $locale) {
    id
    title
    category
    slug
    featuredImage {
      ...FileFieldFragment
    }
  }
}
${FileFieldFragment}
`;

export const allActivitiesQuery = `
query AllActivities($locale: SiteLocale!, $category: String) {
  allActivities(
    filter: {
      OR: [
        { category: { eq: $category } }
        { category: { in: ["snowboard", "sky"] }, eq: "tutti-i-corsi" }
      ]
    }
  ){
    content(locale: $locale) {
      ...ActivityModelContentFieldFragment
    }
    featuredImage {
      ...FileFieldFragment
    }
    id
    order
    category
    price1(locale: $locale)
    price2(locale: $locale)
    price3(locale: $locale)
    price4(locale: $locale)
    pricesIntro(locale: $locale)
    slug(
    specialPrice1(locale: $locale)
    specialPrice2(locale: $locale)
    specialPrice3(locale: $locale)
    specialPrice4(locale: $locale)
    specialPricesIntro(locale: $locale)
    title(locale: $locale)
    seo(locale: $locale) {
      description
      title
      noIndex
      twitterCard
      image {
        ...FileFieldFragment
      }
    }
  }
}
${ActivityModelContentFieldFragment}
${FileFieldFragment}
`;

export const ActivityBySlugQuery = `
  query ActivityBySlug($slug: String!, $locale: SiteLocale!) {
    activity(filter: {slug: {eq: $slug}}, locale: $locale) {
      order
      category
      price1
      price2
      price3
      price4
      pricesIntro
      slug
      specialPrice1
      specialPrice2
      specialPrice3
      specialPrice4
      specialPricesIntro
      title
      featuredImage {
        ...FileFieldFragment
      }
      content {
        ...ActivityModelContentFieldFragment
      }
    }
  }
  ${ActivityModelContentFieldFragment}
  ${FileFieldFragment}
`;

export const AllFaqsQuery = `
query AllFaqs($locale: SiteLocale!) {
  allFaqs(locale: $locale) {
    id
    title
    content {
      value
      links
      blocks
    }
  }
}
`;

export const formatDate = (date: string) => format(parseISO(date), 'PPP');

// query MyQuery {
//   allPages {
//     title(locale: it)
//     slug(locale: it)
//     blocks(locale: it) {
//       ... on ContactRecord {
//         email
//         telephone
//         title
//       }
//       ... on ContentRecord {
//         linkTo
//         title
//       }
//       ... on HeroRecord {
//         title
//         image {
//           url
//         }
//       }
//       ... on LocationRecord {
//         headquarter {
//           longitude
//           latitude
//         }
//         content {
//           blocks
//           links
//           value
//         }
//       }
//       ... on ImagecontentRecord {
//         linkTo
//         title
//         image {
//           url
//         }
//       }
//     }
//   }
// }
