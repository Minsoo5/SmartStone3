import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { KnifeFormService } from './knife-form.service';
import { KnifeService } from '../service/knife.service';
import { IKnife } from '../knife.model';
import { IStone } from 'app/entities/stone/stone.model';
import { StoneService } from 'app/entities/stone/service/stone.service';

import { KnifeUpdateComponent } from './knife-update.component';

describe('Knife Management Update Component', () => {
  let comp: KnifeUpdateComponent;
  let fixture: ComponentFixture<KnifeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let knifeFormService: KnifeFormService;
  let knifeService: KnifeService;
  let stoneService: StoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [KnifeUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(KnifeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KnifeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    knifeFormService = TestBed.inject(KnifeFormService);
    knifeService = TestBed.inject(KnifeService);
    stoneService = TestBed.inject(StoneService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Stone query and add missing value', () => {
      const knife: IKnife = { id: 456 };
      const stones: IStone[] = [{ id: 78005 }];
      knife.stones = stones;

      const stoneCollection: IStone[] = [{ id: 43536 }];
      jest.spyOn(stoneService, 'query').mockReturnValue(of(new HttpResponse({ body: stoneCollection })));
      const additionalStones = [...stones];
      const expectedCollection: IStone[] = [...additionalStones, ...stoneCollection];
      jest.spyOn(stoneService, 'addStoneToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ knife });
      comp.ngOnInit();

      expect(stoneService.query).toHaveBeenCalled();
      expect(stoneService.addStoneToCollectionIfMissing).toHaveBeenCalledWith(
        stoneCollection,
        ...additionalStones.map(expect.objectContaining)
      );
      expect(comp.stonesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const knife: IKnife = { id: 456 };
      const stone: IStone = { id: 77211 };
      knife.stones = [stone];

      activatedRoute.data = of({ knife });
      comp.ngOnInit();

      expect(comp.stonesSharedCollection).toContain(stone);
      expect(comp.knife).toEqual(knife);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKnife>>();
      const knife = { id: 123 };
      jest.spyOn(knifeFormService, 'getKnife').mockReturnValue(knife);
      jest.spyOn(knifeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ knife });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: knife }));
      saveSubject.complete();

      // THEN
      expect(knifeFormService.getKnife).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(knifeService.update).toHaveBeenCalledWith(expect.objectContaining(knife));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKnife>>();
      const knife = { id: 123 };
      jest.spyOn(knifeFormService, 'getKnife').mockReturnValue({ id: null });
      jest.spyOn(knifeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ knife: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: knife }));
      saveSubject.complete();

      // THEN
      expect(knifeFormService.getKnife).toHaveBeenCalled();
      expect(knifeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKnife>>();
      const knife = { id: 123 };
      jest.spyOn(knifeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ knife });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(knifeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStone', () => {
      it('Should forward to stoneService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(stoneService, 'compareStone');
        comp.compareStone(entity, entity2);
        expect(stoneService.compareStone).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
