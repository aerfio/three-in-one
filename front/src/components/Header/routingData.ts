export interface RoutingData {
  path: string;
  label: string;
}

export const LOGOUT_LABEL = "Wyloguj się";

export const AUTHORIZED_ROUTING_DATA: RoutingData[] = [
  {
    path: "/places",
    label: "Miejsca pobytu",
  },
  {
    path: "/places/create",
    label: "Dodaj miejsce",
  },
];

export const UNAUTHORIZED_ROUTING_DATA: RoutingData[] = [
  {
    path: "/login",
    label: "Logowanie",
  },
  {
    path: "/signup",
    label: "Rejestracja",
  },
];
