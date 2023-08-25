import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IKnife } from '../knife.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../knife.test-samples';

import { KnifeService } from './knife.service';

const requireRestSample: IKnife = {
  ...sampleWithRequiredData,
};

describe('Knife Service', () => {
  let service: KnifeService;
  let httpMock: HttpTestingController;
  let expectedResult: IKnife | IKnife[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(KnifeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Knife', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const knife = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(knife).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Knife', () => {
      const knife = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(knife).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Knife', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Knife', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Knife', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addKnifeToCollectionIfMissing', () => {
      it('should add a Knife to an empty array', () => {
        const knife: IKnife = sampleWithRequiredData;
        expectedResult = service.addKnifeToCollectionIfMissing([], knife);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(knife);
      });

      it('should not add a Knife to an array that contains it', () => {
        const knife: IKnife = sampleWithRequiredData;
        const knifeCollection: IKnife[] = [
          {
            ...knife,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addKnifeToCollectionIfMissing(knifeCollection, knife);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Knife to an array that doesn't contain it", () => {
        const knife: IKnife = sampleWithRequiredData;
        const knifeCollection: IKnife[] = [sampleWithPartialData];
        expectedResult = service.addKnifeToCollectionIfMissing(knifeCollection, knife);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(knife);
      });

      it('should add only unique Knife to an array', () => {
        const knifeArray: IKnife[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const knifeCollection: IKnife[] = [sampleWithRequiredData];
        expectedResult = service.addKnifeToCollectionIfMissing(knifeCollection, ...knifeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const knife: IKnife = sampleWithRequiredData;
        const knife2: IKnife = sampleWithPartialData;
        expectedResult = service.addKnifeToCollectionIfMissing([], knife, knife2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(knife);
        expect(expectedResult).toContain(knife2);
      });

      it('should accept null and undefined values', () => {
        const knife: IKnife = sampleWithRequiredData;
        expectedResult = service.addKnifeToCollectionIfMissing([], null, knife, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(knife);
      });

      it('should return initial array if no Knife is added', () => {
        const knifeCollection: IKnife[] = [sampleWithRequiredData];
        expectedResult = service.addKnifeToCollectionIfMissing(knifeCollection, undefined, null);
        expect(expectedResult).toEqual(knifeCollection);
      });
    });

    describe('compareKnife', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareKnife(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareKnife(entity1, entity2);
        const compareResult2 = service.compareKnife(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareKnife(entity1, entity2);
        const compareResult2 = service.compareKnife(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareKnife(entity1, entity2);
        const compareResult2 = service.compareKnife(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
