import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../knife.test-samples';

import { KnifeFormService } from './knife-form.service';

describe('Knife Form Service', () => {
  let service: KnifeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnifeFormService);
  });

  describe('Service methods', () => {
    describe('createKnifeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createKnifeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            knifeStyle: expect.any(Object),
            knifeSize: expect.any(Object),
            metalType: expect.any(Object),
            bevelSides: expect.any(Object),
            currentSharpnessLevel: expect.any(Object),
            desiredOutcome: expect.any(Object),
            startingStone: expect.any(Object),
            middleStone: expect.any(Object),
            finishStone: expect.any(Object),
            stones: expect.any(Object),
          })
        );
      });

      it('passing IKnife should create a new form with FormGroup', () => {
        const formGroup = service.createKnifeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            knifeStyle: expect.any(Object),
            knifeSize: expect.any(Object),
            metalType: expect.any(Object),
            bevelSides: expect.any(Object),
            currentSharpnessLevel: expect.any(Object),
            desiredOutcome: expect.any(Object),
            startingStone: expect.any(Object),
            middleStone: expect.any(Object),
            finishStone: expect.any(Object),
            stones: expect.any(Object),
          })
        );
      });
    });

    describe('getKnife', () => {
      it('should return NewKnife for default Knife initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createKnifeFormGroup(sampleWithNewData);

        const knife = service.getKnife(formGroup) as any;

        expect(knife).toMatchObject(sampleWithNewData);
      });

      it('should return NewKnife for empty Knife initial value', () => {
        const formGroup = service.createKnifeFormGroup();

        const knife = service.getKnife(formGroup) as any;

        expect(knife).toMatchObject({});
      });

      it('should return IKnife', () => {
        const formGroup = service.createKnifeFormGroup(sampleWithRequiredData);

        const knife = service.getKnife(formGroup) as any;

        expect(knife).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IKnife should not enable id FormControl', () => {
        const formGroup = service.createKnifeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewKnife should disable id FormControl', () => {
        const formGroup = service.createKnifeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
