import { Service } from "../types";
import { 
  PLACES_STORAGE,
  Place,
  CreatePlaceDTO,
  EditPlaceDTO,
} from "./types";

import { AuthService } from "../Auth";
import { HttpClient } from "../HttpClient";
import { LocalStorageService } from "../LocalStorage";

export class PlacesService extends Service {
  constructor(
    private readonly _authSvc: AuthService,
    private readonly _httpClient: HttpClient,
    private readonly _localStorageSvc: LocalStorageService<Place>,
  ) {
    super()

    this._localStorageSvc.setList([
      {
        id: "1",
        name: "Dupa 1",
        location: {
          lat: 50.298,
          lng: 18.6965,
        },
        description: "Tutaj byłem",
        visitedDate: "12.06.1897",
      },
      {
        id: "2",
        name: "Dupa 2",
        location: {
          lat: 49.298,
          lng: 19.6965,
        },
        description: "Tutaj byłem",
        visitedDate: "12.06.1897",
      },
      {
        id: "3",
        name: "Dupa 3",
        location: {
          lat: 51.298,
          lng: 17.6965,
        },
        description: "Tutaj byłem",
        visitedDate: "12.06.1897",
      }
    ])
  }

  async fetchPlaces(): Promise<Place[]> {
    // await this._httpClient.get(`/places`);

    return this._localStorageSvc.getList();
  };
  
  async createPlace(dto: CreatePlaceDTO) {
    // await this._httpClient.post(`/places`, dto);

    this._localStorageSvc.append([dto]);
  }

  async removePlace(id: string) {
    // await this._httpClient.delete(`/places/${id}`);

    this.removeById(id);
  }

  async editPlace(dto: EditPlaceDTO) {
    // await this._httpClient.put(`/places/${dto.id}`, dto);

    this.removeById(dto.id);
    this._localStorageSvc.append([dto]);
  }

  private removeById(id: string, key?: string)  {
    const nextList = this._localStorageSvc.getList(key).filter(u => u.id !== id);
    this._localStorageSvc.setList(nextList, key);
  };

  private getById(id: string, key?: string)  {
    return this._localStorageSvc.getList(key).find(u => u.id === id);
  };
}

export const configurePlacesService = ({
  authSvc,
  httpClient,
}: {
  authSvc: AuthService,
  httpClient: HttpClient,
}): PlacesService => {
  const sessionStorageSvc = new LocalStorageService<Place>({ key: PLACES_STORAGE });

  return new PlacesService(
    authSvc,
    httpClient, 
    sessionStorageSvc
  );
};
