

// Fix: Import Icons to use its keys for strong typing.
import { Icons } from './icons';

export const roomsDataStructure: {
    nameKey: string;
    priceKey: string;
    imageFolder: string;
    images: string[];
    features: {
        icon: keyof typeof Icons;
        textKey: string;
    }[];
    details: {
        categoryKey: string;
        items: {
            icon: keyof typeof Icons;
            textKey: string;
        }[];
    }[];
}[] = [
  {
    nameKey: 'rooms.standard.name',
    priceKey: 'rooms.standard.price',
    imageFolder: 'standard',
    images: ['1.webp', '2.webp', '3.webp'],
    features: [
      { icon: 'Eye', textKey: 'rooms.standard.features.gardenView' },
      { icon: 'Ruler', textKey: 'rooms.standard.features.size' },
      { icon: 'Users', textKey: 'rooms.standard.features.persons' },
      { icon: 'Coffee', textKey: 'rooms.standard.features.breakfast' },
    ],
    details: [
      { categoryKey: 'rooms.standard.details.bedroom.title', items: [{ icon: 'Bed', textKey: 'rooms.standard.details.bedroom.bed' }, { icon: 'Shield', textKey: 'rooms.standard.details.bedroom.net' }, { icon: 'Wind', textKey: 'rooms.standard.details.bedroom.fan' }] },
      { categoryKey: 'rooms.standard.details.bathroom.title', items: [{ icon: 'Droplet', textKey: 'rooms.standard.details.bathroom.sink' }, { icon: 'Shower', textKey: 'rooms.standard.details.bathroom.shower' }, { icon: 'Toilet', textKey: 'rooms.standard.details.bathroom.toilet' }] },
      { categoryKey: 'rooms.standard.details.terrace.title', items: [{ icon: 'Chair', textKey: 'rooms.standard.details.terrace.seating' }, { icon: 'Hammock', textKey: 'rooms.standard.details.terrace.hammock' }] },
    ]
  },
  {
    nameKey: 'rooms.superior.name',
    priceKey: 'rooms.superior.price',
    imageFolder: 'superior',
    images: ['1.webp', '2.webp', '3.webp'],
    features: [
      { icon: 'Mountain', textKey: 'rooms.superior.features.jungleView' },
      { icon: 'Ruler', textKey: 'rooms.superior.features.size' },
      { icon: 'Users', textKey: 'rooms.superior.features.persons' },
      { icon: 'Coffee', textKey: 'rooms.superior.features.breakfast' },
    ],
    details: [
      { categoryKey: 'rooms.superior.details.bedroom.title', items: [{ icon: 'Bed', textKey: 'rooms.superior.details.bedroom.bed' }, { icon: 'Shield', textKey: 'rooms.superior.details.bedroom.net' }, { icon: 'Wind', textKey: 'rooms.superior.details.bedroom.fan' }, { icon: 'Safe', textKey: 'rooms.superior.details.bedroom.safe' }] },
      { categoryKey: 'rooms.superior.details.bathroom.title', items: [{ icon: 'Droplet', textKey: 'rooms.superior.details.bathroom.sink' }, { icon: 'Shower', textKey: 'rooms.superior.details.bathroom.shower' }, { icon: 'Toilet', textKey: 'rooms.superior.details.bathroom.toilet' }] },
      { categoryKey: 'rooms.superior.details.terrace.title', items: [{ icon: 'Chair', textKey: 'rooms.superior.details.terrace.seating' }, { icon: 'Hammock', textKey: 'rooms.superior.details.terrace.hammock' }] },
    ]
  },
  {
    nameKey: 'rooms.family.name',
    priceKey: 'rooms.family.price',
    imageFolder: 'family',
    images: ['1.webp', '2.webp', '3.webp'],
    features: [
      { icon: 'Mountain', textKey: 'rooms.family.features.jungleView' },
      { icon: 'Ruler', textKey: 'rooms.family.features.size' },
      { icon: 'Users', textKey: 'rooms.family.features.persons' },
      { icon: 'Coffee', textKey: 'rooms.family.features.breakfast' },
    ],
    details: [
      { categoryKey: 'rooms.family.details.bedroom.title', items: [{ icon: 'Bed', textKey: 'rooms.family.details.bedroom.bed1' }, { icon: 'Bed', textKey: 'rooms.family.details.bedroom.bed2' }, { icon: 'Shield', textKey: 'rooms.family.details.bedroom.net' }, { icon: 'Wind', textKey: 'rooms.family.details.bedroom.fan' }, { icon: 'Safe', textKey: 'rooms.family.details.bedroom.safe' }] },
      { categoryKey: 'rooms.family.details.bathroom.title', items: [{ icon: 'Droplet', textKey: 'rooms.family.details.bathroom.sink' }, { icon: 'Shower', textKey: 'rooms.family.details.bathroom.shower' }, { icon: 'Toilet', textKey: 'rooms.family.details.bathroom.toilet' }] },
      { categoryKey: 'rooms.family.details.terrace.title', items: [{ icon: 'Chair', textKey: 'rooms.family.details.terrace.seating' }, { icon: 'Hammock', textKey: 'rooms.family.details.terrace.hammock' }] },
    ]
  }
];

export const jungleTreksStructure = [
    { durationKey: 'excursions.jungleTreks.options.halfDay.duration', mealsKey: 'excursions.jungleTreks.options.halfDay.meals', price: 'IDR 900.000/person' },
    { durationKey: 'excursions.jungleTreks.options.oneDay.duration', mealsKey: 'excursions.jungleTreks.options.oneDay.meals', price: 'IDR 1.150.000/person' },
    { durationKey: 'excursions.jungleTreks.options.twoDays.duration', mealsKey: 'excursions.jungleTreks.options.twoDays.meals', price: 'IDR 1.980.000/person' },
    { durationKey: 'excursions.jungleTreks.options.threeDays.duration', mealsKey: 'excursions.jungleTreks.options.threeDays.meals', price: 'IDR 2.800.000/person' },
];

export const otherExcursionsStructure = [
  { nameKey: 'excursions.other.massage.name', folder: 'massage', image: 'massage.webp', descriptionKey: 'excursions.other.massage.description', detailsKeys: ['excursions.other.massage.details.duration', 'excursions.other.massage.details.price'] },
  { nameKey: 'excursions.other.cooking.name', folder: 'cooking-class', image: 'cooking.webp', descriptionKey: 'excursions.other.cooking.description', detailsKeys: ['excursions.other.cooking.details.dishes', 'excursions.other.cooking.details.options', 'excursions.other.cooking.details.time', 'excursions.other.cooking.details.group', 'excursions.other.cooking.details.price'] },
  { nameKey: 'excursions.other.village.name', folder: 'village-tour', image: 'village.webp', descriptionKey: 'excursions.other.village.description', detailsKeys: ['excursions.other.village.details.time', 'excursions.other.village.details.group', 'excursions.other.village.details.price'] },
  { nameKey: 'excursions.other.night.name', folder: 'night-trek', image: 'night.webp', descriptionKey: 'excursions.other.night.description', detailsKeys: ['excursions.other.night.details.time', 'excursions.other.night.details.price'] },
  { nameKey: 'excursions.other.flower.name', folder: 'flower-trip', image: 'flower.webp', descriptionKey: 'excursions.other.flower.description', detailsKeys: ['excursions.other.flower.details.price'] },
];

export const privateTransfersStructure = [
    { routeKey: 'transfers.private.routes.medanCenter', duration: '3 h', vehicleKey: 'transfers.vehicles.car', maxPersons: 5, price: '550,000', destinationCode: 'medan' },
    { routeKey: 'transfers.private.routes.medanOutside', duration: '3.5 h', vehicleKey: 'transfers.vehicles.car', maxPersons: 5, price: '600,000', destinationCode: 'medan' },
    { routeKey: 'transfers.private.routes.medanAirport', duration: '4 h', vehicleKey: 'transfers.vehicles.car', maxPersons: 5, price: '700,000', destinationCode: 'medan' },
    { routeKey: 'transfers.private.routes.medanAirport', duration: '4 h', vehicleKey: 'transfers.vehicles.minibus', maxPersons: 10, price: '1,300,000', destinationCode: 'medan' },
    { routeKey: 'transfers.private.routes.berastagi', duration: '5 h', vehicleKey: 'transfers.vehicles.car', maxPersons: 4, price: '800,000', destinationCode: 'berastagi' },
    { routeKey: 'transfers.private.routes.berastagi', duration: '5 h', vehicleKey: 'transfers.vehicles.car', maxPersons: 5, price: '900,000', destinationCode: 'berastagi' },
    { routeKey: 'transfers.private.routes.berastagi', duration: '5 h', vehicleKey: 'transfers.vehicles.minibus', maxPersons: 10, price: '1,800,000', destinationCode: 'berastagi' },
    { routeKey: 'transfers.private.routes.lakeToba', duration: '8 h', vehicleKey: 'transfers.vehicles.car', maxPersons: 4, price: '1,300,000', destinationCode: 'lakeToba' },
    { routeKey: 'transfers.private.routes.lakeToba', duration: '8 h', vehicleKey: 'transfers.vehicles.car', maxPersons: 5, price: '1,400,000', destinationCode: 'lakeToba' },
    { routeKey: 'transfers.private.routes.lakeToba', duration: '8 h', vehicleKey: 'transfers.vehicles.minibus', maxPersons: 10, price: '2,300,000', destinationCode: 'lakeToba' },
];

export const busTransfersStructure = [
    { routeKey: 'transfers.bus.routes.medan', departure: '14:00', price: '200,000', destinationCode: 'medan' },
    { routeKey: 'transfers.bus.routes.lawangMedan', departure: '08:30', price: '200,000', destinationCode: 'medan' },
    { routeKey: 'transfers.bus.routes.berastagi', departure: '08:30', price: '200,000', destinationCode: 'berastagi' },
    { routeKey: 'transfers.bus.routes.lakeToba', departure: '08:30', price: '250,000', destinationCode: 'lakeToba' },
];

export const packagesDataStructure = [
    {
        nameKey: 'packages.package1.name',
        image: 'package1.webp',
        inclusionKeys: [
            'packages.package1.inclusions.pickup',
            'packages.package1.inclusions.night1',
            'packages.package1.inclusions.trek',
            'packages.package1.inclusions.night2',
            'packages.package1.inclusions.dropoff',
        ],
        priceKeys: [
            'packages.package1.prices.person1',
            'packages.package1.prices.person2',
            'packages.package1.prices.person3',
            'packages.package1.prices.person4',
        ]
    },
    {
        nameKey: 'packages.package2.name',
        image: 'package2.webp',
        inclusionKeys: [
            'packages.package2.inclusions.pickup',
            'packages.package2.inclusions.nights',
            'packages.package2.inclusions.trek',
            'packages.package2.inclusions.dropoff',
        ],
        priceKeys: [
            'packages.package2.prices.person2',
            'packages.package2.prices.person3',
            'packages.package2.prices.person4',
        ]
    },
    {
        nameKey: 'packages.package3.name',
        image: 'package3.webp',
        inclusionKeys: [
            'packages.package3.inclusions.pickup',
            'packages.package3.inclusions.night1',
            'packages.package3.inclusions.trek',
            'packages.package3.inclusions.night2',
            'packages.package3.inclusions.dropoff',
        ],
        priceKeys: [
            'packages.package3.prices.person1',
            'packages.package3.prices.person2',
        ]
    },
];
