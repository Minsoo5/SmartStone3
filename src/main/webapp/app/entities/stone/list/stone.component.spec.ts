import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { StoneService } from '../service/stone.service';

import { StoneComponent } from './stone.component';

describe('Stone Management Component', () => {
  let comp: StoneComponent;
  let fixture: ComponentFixture<StoneComponent>;
  let service: StoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'stone', component: StoneComponent }]), HttpClientTestingModule],
      declarations: [StoneComponent],
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
      .overrideTemplate(StoneComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StoneComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StoneService);

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
    expect(comp.stones?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to stoneService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getStoneIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getStoneIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
