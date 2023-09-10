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
}

export interface RacketsApi {
  rackets: ApiRackets[];
}

export interface Racket extends Omit<RacketsApi, "_id" | "rackets"> {
  id: string;
  name: string;
  shape: string;
  weight: number;
  material: string;
  power: number;
  control: number;
  description: string;
  image: string;
  favorite: boolean;
}

export interface RacketsUser extends Partial<Racket> {
  user: string;
}
