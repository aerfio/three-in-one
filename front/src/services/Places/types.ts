export const PLACES_STORAGE = "PLACES_STORAGE_KEY"

export interface Place {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  description?: string;
  visitedDate?: string;
}

export interface CreatePlaceDTO extends Place {}
export interface EditPlaceDTO extends Place {}
