import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StoneFormService } from './stone-form.service';
import { StoneService } from '../service/stone.service';
import { IStone } from '../stone.model';

import { StoneUpdateComponent } from './stone-update.component';

describe('Stone Management Update Component', () => {
  let comp: StoneUpdateComponent;
  let fixture: ComponentFixture<StoneUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let stoneFormService: StoneFormService;
  let stoneService: StoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StoneUpdateComponent],
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
      .overrideTemplate(StoneUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StoneUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    stoneFormService = TestBed.inject(StoneFormService);
    stoneService = TestBed.inject(StoneService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const stone: IStone = { id: 456 };

      activatedRoute.data = of({ stone });
      comp.ngOnInit();

      expect(comp.stone).toEqual(stone);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStone>>();
      const stone = { id: 123 };
      jest.spyOn(stoneFormService, 'getStone').mockReturnValue(stone);
      jest.spyOn(stoneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stone });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stone }));
      saveSubject.complete();

      // THEN
      expect(stoneFormService.getStone).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(stoneService.update).toHaveBeenCalledWith(expect.objectContaining(stone));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStone>>();
      const stone = { id: 123 };
      jest.spyOn(stoneFormService, 'getStone').mockReturnValue({ id: null });
      jest.spyOn(stoneService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stone: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stone }));
      saveSubject.complete();

      // THEN
      expect(stoneFormService.getStone).toHaveBeenCalled();
      expect(stoneService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStone>>();
      const stone = { id: 123 };
      jest.spyOn(stoneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stone });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(stoneService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
