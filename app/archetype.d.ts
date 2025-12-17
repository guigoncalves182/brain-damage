export interface Archetype {
  _id: string;
  id: string;
  name: string;
  defect?: string;
  characteristic?: string;
  flavorText?: string;
  backgroundImage: string;
  diceRoll: [string, string, string, string, string, string];
  brainDamage: {
    topLeft: number;
    topRight: number;
    middleLeft: number;
    middleRight: number;
    bottomLeft: number;
    bottomRight: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default Archetype;
