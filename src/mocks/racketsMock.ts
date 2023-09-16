import { ApiRackets, Racket } from "../types";

export const racketsMock: Racket[] = [
  {
    id: "64f3a180784b0b6d4ddd8fe2",
    control: 8,
    favorite: false,
    description:
      "Slightly softer core, slightly increasing sweet spot size and core reactivity. Intermediate-advanced level players looking for power and control.",
    image:
      "https://cdn.discordapp.com/attachments/1150483066259775582/1151422444540809246/AdidasMetalbone.webp",
    material: "Soft EVA",
    name: "Adidas Metalbone 3.2",
    power: 10,
    shape: "Diamond shape",
    weight: 355,
    user: "userId",
  },
  {
    id: "64f3a180784b0b6d4ddd8fe3",
    control: 10,
    description:
      "Precise touch and high maneuverability. This racket will help players excel on defense and disguise drop shots. It is not designed to be the most powerful racket.",
    favorite: false,
    image:
      "https://cdn.discordapp.com/attachments/1150483066259775582/1151422446835081226/BullPadelVertex.webp",
    material: "Multi-EVA",
    name: "Bullpadel Vertex 03 CTR",
    power: 7,
    shape: "Round shape",
    weight: 370,
    user: "userId",
  },
];

export const apiRacketsMock: ApiRackets[] = [
  {
    user: "userId",
    _id: "64f3a180784b0b6d4ddd8fe2",
    favorite: false,
    control: 8,
    description:
      "Slightly softer core, slightly increasing sweet spot size and core reactivity. Intermediate-advanced level players looking for power and control.",
    image:
      "https://cdn.discordapp.com/attachments/1150483066259775582/1151422444540809246/AdidasMetalbone.webp",
    material: "Soft EVA",
    name: "Adidas Metalbone 3.2",
    power: 10,
    shape: "Diamond shape",
    weight: 355,
  },
  {
    _id: "64f3a180784b0b6d4ddd8fe3",
    control: 10,
    description:
      "Precise touch and high maneuverability. This racket will help players excel on defense and disguise drop shots. It is not designed to be the most powerful racket.",
    favorite: false,
    image:
      "https://cdn.discordapp.com/attachments/1150483066259775582/1151422446835081226/BullPadelVertex.webp",
    material: "Multi-EVA",
    name: "Bullpadel Vertex 03 CTR",
    power: 7,
    shape: "Round shape",
    weight: 370,
    user: "userId",
  },
];

export const newRacketsMock: ApiRackets = {
  user: "userId",
  _id: "64f3a180784b0b6d4ddd8feb",
  favorite: false,
  control: 10,
  description:
    "It is a perfect padel racket for players who like soft padel rackets who are looking for good control, but who need a bit of power.",
  image:
    "https://cdn.discordapp.com/attachments/1150483066259775582/1151422445706813541/Black-Crown-racket-Hurricane-2-1.webp",
  material: "Soft EVA",
  name: "Black Crown Hurricane 2.0",
  power: 8,
  shape: "Round shape",
  weight: 365,
};

export const formMock: Racket = {
  user: "userId",
  id: "64f3a180784b0b6d4ddd8feb",
  favorite: false,
  control: 10,
  description:
    "It is a perfect padel racket for players who like soft padel rackets who are looking for good control, but who need a bit of power.",
  image:
    "https://cdn.discordapp.com/attachments/1150483066259775582/1151422445706813541/Black-Crown-racket-Hurricane-2-1.webp",
  material: "Soft EVA",
  name: "Black Crown Hurricane 2.0",
  power: 8,
  shape: "Round shape",
  weight: 365,
};
