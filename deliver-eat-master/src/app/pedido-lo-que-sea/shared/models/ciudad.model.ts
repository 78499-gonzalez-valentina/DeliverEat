export interface Ciudad {
  id: number
  nombre: string;
  posicion: google.maps.LatLngLiteral
}

export const ciudades: Ciudad[] = [
  {
    id: 1,
    nombre: "Córdoba",
    posicion: {
      lat: -31.4290879,
      lng: -64.18715
    }
  },
  {
    id: 2,
    nombre: "San Francisco",
    posicion: {
      lat: -31.4250149,
      lng: -62.0844485
    }
  },
  {
    id: 3,
    nombre: "Villa General Belgrano",
    posicion: {
      lat: -31.9776337,
      lng: -64.5609358
    }
  }
];
