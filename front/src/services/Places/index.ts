import { Service } from "../types";
import { 
  Place,
  DeserializedPlace,
  CreatePlaceDTO,
  EditPlaceDTO,
} from "./types";

import { GraphQLClient } from "../GraphQL";

import {
  ADD_PLACE_MUTATION,
  ADD_PLACE_MUTATION_VARIABLES,
  DELETE_PLACE_MUTATION,
  DELETE_PLACE_MUTATION_VARIABLES,
} from "./mutations";
import {
  PLACES_QUERY,
} from "./queries";

export class PlacesService extends Service {
  constructor(
    private readonly _gqlClient: GraphQLClient,
  ) {
    super()
  }

  async fetchPlaces(): Promise<Place[]> {
    const response = await this._gqlClient.do<{ places: DeserializedPlace[] }>(
      PLACES_QUERY,
    );
    return this._serializePlaces(response.data.places);
  };
  
  async createPlace(dto: CreatePlaceDTO) {
    await this._gqlClient.do<{ user: { id: string } }, ADD_PLACE_MUTATION_VARIABLES>(
      ADD_PLACE_MUTATION,
      {
        lat: dto.location.lat,
        lng: dto.location.lng,
        name: dto.name,
        description: dto.description,
        visitedDate: dto.visitedDate,
        placeId: dto.name,
      }
    );
  }

  async removePlace(id: number) {
    await this._gqlClient.do<{ ok: boolean }, DELETE_PLACE_MUTATION_VARIABLES>(
      DELETE_PLACE_MUTATION,
      {
        id
      }
    );
  }

  async editPlace(dto: EditPlaceDTO) {
    // await this._httpClient.put(`/places/${dto.id}`, dto);
  }

  private _serializePlaces(places: DeserializedPlace[]): Place[] {
    return places.map(place => ({
      ...place,
      location: {
        lat: place.lat,
        lng: place.lng,
      }
    } as Place))
  }
}

export const configurePlacesService = ({
  gqlClient,
}: {
  gqlClient: GraphQLClient,
}): PlacesService => {
  return new PlacesService(
    gqlClient, 
  );
};
