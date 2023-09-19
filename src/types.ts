export interface ApiRackets {
  _id: string;
  name: string;
  shape: string;
  weight: number;
  material: string;
  power: number;
  control: number;
  description: string;
  image: string;
  favorite: boolean;
  user: string;
}

export interface RacketsApi {
  rackets: ApiRackets[];
}

export interface Racket extends Omit<ApiRackets, "_id"> {
  id: string;
}

export interface RacketsMock {
  racketsMock: Racket[];
}

export interface NewApiRacket {
  id: string;
  _id?: string;
  name: string;
  shape: string;
  weight: number;
  material: string;
  power: number;
  control: number;
  description: string;
  image: string;
  favorite: boolean;
  user: string;
}
