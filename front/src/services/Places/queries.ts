export const PLACES_QUERY = `
  query places {
    places {
      id
      user {
        id
      }
      placeId
      name
      lat
      lng
      visitedDate
      description
    }
  }
`
