
export enum Page {
  Home = 'HOME',
  Rooms = 'ROOMS',
  Restaurant = 'RESTAURANT',
  Excursions = 'EXCURSIONS',
  Transfers = 'TRANSFERS',
  Packages = 'PACKAGES',
  Contact = 'CONTACT',
}

export interface Room {
  name: string;
  price: string;
  images: string[];
  features: { icon: keyof typeof import('./constants/icons').Icons; text: string }[];
  details: {
    category: string;
    items: { icon: keyof typeof import('./constants/icons').Icons; text: string }[];
  }[];
}

export interface Trek {
    duration: string;
    meals: string;
    price: string;
}

export interface OtherExcursion {
    name: string;
    image: string;
    description: string;
    details: string[];
}

export interface PrivateTransfer {
    route: string;
    duration: string;
    vehicle: string;
    maxPersons: number;
    price: string;
    destinationCode: string;
}

export interface BusTransfer {
    route: string;
    departure: string;
    price: string;
    destinationCode: string;
}

export interface Package {
    name: string;
    image: string;
    inclusions: string[];
    prices: string[];
}