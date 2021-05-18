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
            ...on call_to_action {
              ...call_to_actionFields
            }
            ...on carousel {
              ...carouselFields
            }
            ...on link {
              ...linkFields
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
