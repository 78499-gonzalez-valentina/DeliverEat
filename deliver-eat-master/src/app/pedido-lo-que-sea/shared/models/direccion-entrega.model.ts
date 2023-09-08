import {Ciudad, ciudades} from "./ciudad.model";

export interface DireccionEntrega {
  id: number;
  calleNombre: string;
  calleNumero: number;
  ciudad: Ciudad;
  posicion: google.maps.LatLngLiteral
}

export const direccionesEntrega: DireccionEntrega[] = [
  {
    id: 1,
    calleNombre: 'Calderón de la Barça',
    calleNumero: 425,
    ciudad: ciudades[0],
    posicion: {
      lat: -31.3854228,
      lng: -64.1823389
    }
  },
  {
    id: 2,
    calleNombre: 'Laprida',
    calleNumero: 235,
    ciudad: ciudades[0],
    posicion: {
      lat: -31.4234661,
      lng: -64.1930151
    }
  },
  {
    id: 3,
    calleNombre: 'Independencia',
    calleNumero: 455,
    ciudad: ciudades[0],
    posicion: {
      lat: -31.4216967,
      lng: -64.1884775
    }
  },
  {
    id: 4,
    calleNombre: 'Av. Colón',
    calleNumero: 359,
    ciudad: ciudades[0],
    posicion: {
      lat: -31.4123041,
      lng: -64.1903246
    }
  },
  {
    id: 5,
    calleNombre: 'Buenos Aires',
    calleNumero: 356,
    ciudad: ciudades[0],
    posicion: {
      lat: -31.4202374,
      lng: -64.1868427
    }
  },
  {
    id: 6,
    calleNombre: 'Dean Funes',
    calleNumero: 150,
    ciudad: ciudades[1],
    posicion: {
      lat: -31.4207002,
      lng: -62.0917761
    }
  },
  {
    id: 7,
    calleNombre: 'Salta',
    calleNumero: 65,
    ciudad: ciudades[1],
    posicion: {
      lat: -31.4367796,
      lng: -62.0705754
    }
  },
  {
    id: 8,
    calleNombre: 'Blvd. Roque Sáenz Peña',
    calleNumero: 650,
    ciudad: ciudades[1],
    posicion: {
      lat: -31.4372653,
      lng: -62.0748915
    }
  },
  {
    id: 9,
    calleNombre: 'Lopez y Planes',
    calleNumero: 27,
    ciudad: ciudades[1],
    posicion: {
      lat: -31.4411357,
      lng: -62.0717433
    }
  },
  {
    id: 10,
    calleNombre: 'Belgrano',
    calleNumero: 97,
    ciudad: ciudades[1],
    posicion: {
      lat: -31.4262298,
      lng: -62.0935535
    }
  },
  {
    id: 11,
    calleNombre: 'Uruguay',
    calleNumero: 156,
    ciudad: ciudades[2],
    posicion: {
      lat: -31.9789903,
      lng: -64.5651777
    }
  },
  {
    id: 12,
    calleNombre: 'Jujuy',
    calleNumero: 258,
    ciudad: ciudades[2],
    posicion: {
      lat: -31.9812265,
      lng: -64.5553257
    }
  },
  {
    id: 13,
    calleNombre: 'Jorge Newbery',
    calleNumero: 87,
    ciudad: ciudades[2],
    posicion: {
      lat: -31.9741866,
      lng: -64.5670163
    }
  },
  {
    id: 14,
    calleNombre: 'Catamarca',
    calleNumero: 485,
    ciudad: ciudades[2],
    posicion: {
      lat: -31.9783749,
      lng: -64.5753839
    }
  },
  {
    id: 15,
    calleNombre: 'Av. Argentina',
    calleNumero: 55,
    ciudad: ciudades[2],
    posicion: {
      lat: -31.9735411,
      lng: -64.5820715
    }
  }
]
