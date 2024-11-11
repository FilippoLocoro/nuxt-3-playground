import { format, parseISO } from 'date-fns';

export const responsiveImageFields = `
  fragment responsiveImageFields on ResponsiveImage {
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
`;

// export const imageFields = `
//   fragment imageFields on ImageBlockRecord {
//     responsiveImage {
//       ...responsiveImageFields
//     }
//     alt
//     height
//     url
//   }
// `;

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
            responsiveImage {
              ...responsiveImageFields
            }
            alt
            height
            url
          }
        }
      }
    }
  }
  ${responsiveImageFields}
  ${seoMetaTagsFields}
`;

export const formatDate = (date: string) => format(parseISO(date), 'PPP');
