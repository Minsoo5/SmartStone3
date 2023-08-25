import { IKnife } from 'app/entities/knife/knife.model';

export interface IStone {
  id: number;
  gritLeve?: number | null;
  sharpnessLimit?: number | null;
  knives?: Pick<IKnife, 'id'>[] | null;
}

export type NewStone = Omit<IStone, 'id'> & { id: null };
