import { IStone, NewStone } from './stone.model';

export const sampleWithRequiredData: IStone = {
  id: 54525,
};

export const sampleWithPartialData: IStone = {
  id: 32820,
};

export const sampleWithFullData: IStone = {
  id: 44473,
  gritLeve: 93108,
  sharpnessLimit: 36934,
};

export const sampleWithNewData: NewStone = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
