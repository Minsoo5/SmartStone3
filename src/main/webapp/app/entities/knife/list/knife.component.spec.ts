import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { KnifeService } from '../service/knife.service';

import { KnifeComponent } from './knife.component';

describe('Knife Management Component', () => {
  let comp: KnifeComponent;
  let fixture: ComponentFixture<KnifeComponent>;
  let service: KnifeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'knife', component: KnifeComponent }]), HttpClientTestingModule],
      declarations: [KnifeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(KnifeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KnifeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(KnifeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.knives?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to knifeService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getKnifeIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getKnifeIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
