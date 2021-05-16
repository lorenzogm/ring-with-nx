const graphQuery = `{
  content {
    ...contentFields
    body {
      ...on grid {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
          content {
            ...on carousel {
              ...carouselFields
            }
            ...on shop_location {
              ...shop_locationFields
            }
            ...on teaser {
              ...teaserFields
            }
          }
        }
      }
    }
  }
}`

export default graphQuery
