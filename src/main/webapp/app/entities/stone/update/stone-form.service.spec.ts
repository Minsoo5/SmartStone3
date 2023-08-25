import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../stone.test-samples';

import { StoneFormService } from './stone-form.service';

describe('Stone Form Service', () => {
  let service: StoneFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoneFormService);
  });

  describe('Service methods', () => {
    describe('createStoneFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStoneFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            gritLeve: expect.any(Object),
            sharpnessLimit: expect.any(Object),
            knives: expect.any(Object),
          })
        );
      });

      it('passing IStone should create a new form with FormGroup', () => {
        const formGroup = service.createStoneFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            gritLeve: expect.any(Object),
            sharpnessLimit: expect.any(Object),
            knives: expect.any(Object),
          })
        );
      });
    });

    describe('getStone', () => {
      it('should return NewStone for default Stone initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStoneFormGroup(sampleWithNewData);

        const stone = service.getStone(formGroup) as any;

        expect(stone).toMatchObject(sampleWithNewData);
      });

      it('should return NewStone for empty Stone initial value', () => {
        const formGroup = service.createStoneFormGroup();

        const stone = service.getStone(formGroup) as any;

        expect(stone).toMatchObject({});
      });

      it('should return IStone', () => {
        const formGroup = service.createStoneFormGroup(sampleWithRequiredData);

        const stone = service.getStone(formGroup) as any;

        expect(stone).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStone should not enable id FormControl', () => {
        const formGroup = service.createStoneFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStone should disable id FormControl', () => {
        const formGroup = service.createStoneFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
