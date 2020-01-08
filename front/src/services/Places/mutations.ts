export const ADD_PLACE_MUTATION = `
  mutation addPlace(
    $description: String
    $lat: Float!
    $lng: Float!
    $name: String!
    $placeId: String!
    $visitedDate: String
  ) {
    addPlace(
      description: $description
      lat: $lat
      lng: $lng
      name: $name
      placeId: $placeId
      visitedDate:$visitedDate
    ) {
      place {
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
  }
`

export interface ADD_PLACE_MUTATION_VARIABLES {
  description: string;
  lat: number;
  lng: number;
  name: string;
  placeId: string;
  visitedDate: string;
}

export const DELETE_PLACE_MUTATION = `
  mutation deletePlace(
    $id: Int!
  ) {
    deletePlace(
      id: $id
    ) {
      ok
    }
  }
`

export interface DELETE_PLACE_MUTATION_VARIABLES {
  id: number;
}