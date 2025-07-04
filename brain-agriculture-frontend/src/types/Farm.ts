import type { Culture } from "./Culture";


export interface Farm {
  id: string;
  name: string;
  city: string;
  state: string;
  totalAreaHectares: number;
  arableAreaHectares: number;
  vegetationAreaHectares: number;
  cultures: Culture[];
}