export const QUERY_WP_ALL_TAGS = `
  {
    tags(first: 10) {
      edges {
        node {
          tagId
          description
          id
          name
          slug
        }
      }
    }
  }
`

export const QUERY_WP_ALL_TAGS_SITEMAP = `
 {
    tags(first: 10) {
      edges {
        node {
          tagId
          description
          id
          name
          slug
        }
      }
    }
  }
  `

export const QUERY_WP_TAG_BY_SLUG = `
  query TagBySlug($slug: ID!) {
    tag(id: $slug, idType: SLUG) {
      description
      id
      name
      language {
        slug
      }
      seo {
        breadcrumbTitle
        canonicalUrl
        description
        title
        jsonLd {
          raw
        }
      }
      uri
      slug
    }
  }
`
