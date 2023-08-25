import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KnifeDetailComponent } from './knife-detail.component';

describe('Knife Management Detail Component', () => {
  let comp: KnifeDetailComponent;
  let fixture: ComponentFixture<KnifeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnifeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ knife: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(KnifeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(KnifeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load knife on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.knife).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
