import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IKnife, NewKnife } from '../knife.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKnife for edit and NewKnifeFormGroupInput for create.
 */
type KnifeFormGroupInput = IKnife | PartialWithRequiredKeyOf<NewKnife>;

type KnifeFormDefaults = Pick<NewKnife, 'id' | 'stones'>;

type KnifeFormGroupContent = {
  id: FormControl<IKnife['id'] | NewKnife['id']>;
  knifeStyle: FormControl<IKnife['knifeStyle']>;
  knifeSize: FormControl<IKnife['knifeSize']>;
  metalType: FormControl<IKnife['metalType']>;
  bevelSides: FormControl<IKnife['bevelSides']>;
  currentSharpnessLevel: FormControl<IKnife['currentSharpnessLevel']>;
  desiredOutcome: FormControl<IKnife['desiredOutcome']>;
  startingStone: FormControl<IKnife['startingStone']>;
  middleStone: FormControl<IKnife['middleStone']>;
  finishStone: FormControl<IKnife['finishStone']>;
  stones: FormControl<IKnife['stones']>;
};

export type KnifeFormGroup = FormGroup<KnifeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KnifeFormService {
  createKnifeFormGroup(knife: KnifeFormGroupInput = { id: null }): KnifeFormGroup {
    const knifeRawValue = {
      ...this.getFormDefaults(),
      ...knife,
    };
    return new FormGroup<KnifeFormGroupContent>({
      id: new FormControl(
        { value: knifeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      knifeStyle: new FormControl(knifeRawValue.knifeStyle),
      knifeSize: new FormControl(knifeRawValue.knifeSize),
      metalType: new FormControl(knifeRawValue.metalType),
      bevelSides: new FormControl(knifeRawValue.bevelSides),
      currentSharpnessLevel: new FormControl(knifeRawValue.currentSharpnessLevel),
      desiredOutcome: new FormControl(knifeRawValue.desiredOutcome),
      startingStone: new FormControl(knifeRawValue.startingStone),
      middleStone: new FormControl(knifeRawValue.middleStone),
      finishStone: new FormControl(knifeRawValue.finishStone),
      stones: new FormControl(knifeRawValue.stones ?? []),
    });
  }

  getKnife(form: KnifeFormGroup): IKnife | NewKnife {
    return form.getRawValue() as IKnife | NewKnife;
  }

  resetForm(form: KnifeFormGroup, knife: KnifeFormGroupInput): void {
    const knifeRawValue = { ...this.getFormDefaults(), ...knife };
    form.reset(
      {
        ...knifeRawValue,
        id: { value: knifeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): KnifeFormDefaults {
    return {
      id: null,
      stones: [],
    };
  }
}
