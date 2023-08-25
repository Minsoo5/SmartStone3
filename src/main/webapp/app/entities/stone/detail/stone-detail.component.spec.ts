import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoneDetailComponent } from './stone-detail.component';

describe('Stone Management Detail Component', () => {
  let comp: StoneDetailComponent;
  let fixture: ComponentFixture<StoneDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoneDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ stone: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StoneDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StoneDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load stone on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.stone).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
