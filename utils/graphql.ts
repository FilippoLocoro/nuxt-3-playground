import { format, parseISO } from 'date-fns';

// export const responsiveImageFields = `
//   fragment responsiveImageFields on ResponsiveImage {
//     aspectRatio
//     alt
//     base64
//     bgColor
//     height
//     sizes
//     src
//     srcSet
//     title
//     webpSrcSet
//     width
//   }
// `;

export const contentFieldFragment = `
  fragment contentFieldFragment on PageModelContentField {
    blocks
    links
    value
  }
`;

export const featuredImageFields = `
  fragment featuredImageFields on FileField {
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
            ...featuredImageFields
          }
        }
      }
    }
  }
  ${featuredImageFields}
  ${seoMetaTagsFields}
`;

export const pageQuery = `
query Page($slug: String!, $locale: SiteLocale!) {
  page(locale: $locale, filter: {slug: {eq: $slug}}) {
    slug
    title
    id
    featuredImage {
      ...featuredImageFields
    }
    content {
      ...contentFieldFragment
    }
  }
}
${contentFieldFragment}
${featuredImageFields}
`;

export const allCategoriesQuery = `
query AllCategories($locale: SiteLocale!) {
  allCategories {
    id
    title
    featuredImage {
      ...featuredImageFields
    }
    link {
      slug(locale: $locale)
      title(locale: $locale)
    }
  }
}
${featuredImageFields}
`;

export const formatDate = (date: string) => format(parseISO(date), 'PPP');
