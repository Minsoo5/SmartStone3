import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStone, NewStone } from '../stone.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStone for edit and NewStoneFormGroupInput for create.
 */
type StoneFormGroupInput = IStone | PartialWithRequiredKeyOf<NewStone>;

type StoneFormDefaults = Pick<NewStone, 'id' | 'knives'>;

type StoneFormGroupContent = {
  id: FormControl<IStone['id'] | NewStone['id']>;
  gritLeve: FormControl<IStone['gritLeve']>;
  sharpnessLimit: FormControl<IStone['sharpnessLimit']>;
  knives: FormControl<IStone['knives']>;
};

export type StoneFormGroup = FormGroup<StoneFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StoneFormService {
  createStoneFormGroup(stone: StoneFormGroupInput = { id: null }): StoneFormGroup {
    const stoneRawValue = {
      ...this.getFormDefaults(),
      ...stone,
    };
    return new FormGroup<StoneFormGroupContent>({
      id: new FormControl(
        { value: stoneRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      gritLeve: new FormControl(stoneRawValue.gritLeve),
      sharpnessLimit: new FormControl(stoneRawValue.sharpnessLimit),
      knives: new FormControl(stoneRawValue.knives ?? []),
    });
  }

  getStone(form: StoneFormGroup): IStone | NewStone {
    return form.getRawValue() as IStone | NewStone;
  }

  resetForm(form: StoneFormGroup, stone: StoneFormGroupInput): void {
    const stoneRawValue = { ...this.getFormDefaults(), ...stone };
    form.reset(
      {
        ...stoneRawValue,
        id: { value: stoneRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StoneFormDefaults {
    return {
      id: null,
      knives: [],
    };
  }
}
