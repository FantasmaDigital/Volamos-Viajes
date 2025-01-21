export interface DirectionsResult {
  routes: {
    overview_path: google.maps.LatLng[];
    legs: {
      duration: {
        text: string;
      };
    }[];
  }[];
}

export interface SaveInLocalProps {
  selectedRestaurants: any[];
  setRestaurantsInStorage: (data: any[]) => void;
}

export interface PlacesServiceResult {
  place_id: string;
}

export interface NearbySearchRequest {
  location: LatLng;
  radius: number;
  type: string;
}

export type LatLng = {
  lat: number;
  lng: number;
};

export interface Restaurant {
  place_id: string;
  geometry: {
    location: LatLng;
  };
  name: string;
  icon: string;
}

// Maps.tsx Interfaces

export interface HandleSearchStartPointProps {
  map: any;
  startPoint: any;
  endPoint: any;
  setRestaurants: any;
}

export interface GetCurrentLocationProps {
  setDefaultRoute: any;
}

export interface CurrentRouteValidationProps {
  startPoint: any;
  endPoint: any;
  directionsRenderer: any;
  setEstimatedTime: any;
  travelMode: any;
}
