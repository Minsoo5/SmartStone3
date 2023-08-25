import { IStone } from 'app/entities/stone/stone.model';
import { KnifeStyle } from 'app/entities/enumerations/knife-style.model';
import { KnifeSize } from 'app/entities/enumerations/knife-size.model';
import { MetalType } from 'app/entities/enumerations/metal-type.model';
import { BevelSides } from 'app/entities/enumerations/bevel-sides.model';
import { CurrentSharpness } from 'app/entities/enumerations/current-sharpness.model';
import { DesiredOutCome } from 'app/entities/enumerations/desired-out-come.model';

export interface IKnife {
  id: number;
  knifeStyle?: KnifeStyle | null;
  knifeSize?: KnifeSize | null;
  metalType?: MetalType | null;
  bevelSides?: BevelSides | null;
  currentSharpnessLevel?: CurrentSharpness | null;
  desiredOutcome?: DesiredOutCome | null;
  startingStone?: string | null;
  middleStone?: string | null;
  finishStone?: string | null;
  stones?: Pick<IStone, 'id'>[] | null;
}

export type NewKnife = Omit<IKnife, 'id'> & { id: null };
