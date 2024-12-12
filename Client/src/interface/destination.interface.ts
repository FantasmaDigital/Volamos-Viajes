interface Days {
  avalible: string;
  text: string;
}

interface Tables {
  title: string;
  rows: string[][];
}

interface TourIncluded {
  name: string;
  duration?: string; // Duración opcional
  description: string; // Descripción detallada
}

interface Package {
  description: string;
  days: Days[];
  includes: string[];
  table: Tables[];
  policy: string[];
  avalibleUntil: string;
  toursIncluded?: TourIncluded[]; // Campo opcional para tours
}

export interface Destination {
  name: string;
  package: Package[];
  images: string[];
}
