import { KnifeStyle } from 'app/entities/enumerations/knife-style.model';
import { KnifeSize } from 'app/entities/enumerations/knife-size.model';
import { MetalType } from 'app/entities/enumerations/metal-type.model';
import { BevelSides } from 'app/entities/enumerations/bevel-sides.model';
import { CurrentSharpness } from 'app/entities/enumerations/current-sharpness.model';
import { DesiredOutCome } from 'app/entities/enumerations/desired-out-come.model';

import { IKnife, NewKnife } from './knife.model';

export const sampleWithRequiredData: IKnife = {
  id: 99427,
};

export const sampleWithPartialData: IKnife = {
  id: 62674,
  knifeStyle: KnifeStyle['SLICER'],
  metalType: MetalType['STAINLESS_STEEL'],
  bevelSides: BevelSides['SINGLE'],
  startingStone: 'Human Salad Landing',
  finishStone: 'invoice algorithm',
};

export const sampleWithFullData: IKnife = {
  id: 16649,
  knifeStyle: KnifeStyle['CHEF_KNIFE'],
  knifeSize: KnifeSize['TWO_HUNDRED_TWENTY'],
  metalType: MetalType['NOT_SURE'],
  bevelSides: BevelSides['SINGLE'],
  currentSharpnessLevel: CurrentSharpness['RAZOR_SHARP'],
  desiredOutcome: DesiredOutCome['WORK_HORSE'],
  startingStone: 'Tome',
  middleStone: 'Dynamic',
  finishStone: 'generating',
};

export const sampleWithNewData: NewKnife = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
